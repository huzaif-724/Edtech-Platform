const Course = require("../models/Course")
const User = require("../models/User");
const { instance } = require("../config/razorpay")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose");
const crypto = require("crypto");
const {courseEnrollmentEmail} = require("../mailTemplate/courseEnrollmentEmail");



// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
    const { courseId } = req.body; // Expecting a single course ID
    const userId = req.user.id;
  
    // Validate input
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Course ID.',
      });
    }
  
    try {
      // Find the course by ID
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found.',
        });
      }
  
      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnroled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: 'You are already enrolled in this course.',
        });
      }
  
      // Create Razorpay order options
      const options = {
        amount: course.price * 100, // Convert to paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes : {
          courseId,
          userId
        }
      };
  
      // Initiate the payment using Razorpay
      const paymentResponse = await instance.orders.create(options);
      console.log('Razorpay Order:', paymentResponse);
  
      return res.status(200).json({
        success: true,
        data: paymentResponse,
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Could not process the payment.',
      });
    }
};



exports.verifySignature = async (req, res)=>{

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    // Generate hash using secret and request body
    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
        console.log("Payment is Authorised");

        // Extract courseId and userId from the payload
        const notes = req.body?.payload?.payment?.entity?.notes || {};
        const { courseId, userId } = notes;

        try {
            // Validate courseId and userId
            if (!courseId || !userId) {
                return res
                .status(400)
                .json({ success: false, message: "Missing courseId or userId" });
            }

            // Enroll the user in the course
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnroled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                return res
                .status(404)
                .json({ success: false, message: "Course not found" });
            }

            // Update user's enrolled courses
            const enrolledStudent = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { courses: courseId } },
                { new: true }
            );

            if (!enrolledStudent) {
                return res.status(404).json({
                success: false,
                message: "User not found",
                });
            }

            const mailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.title}`,
                courseEnrollmentEmail(enrolledCourse.title, enrolledStudent.name) // Generate the email body using the template
            );
            console.log("Verification email sent successfully: ", mailResponse.response);


            //return response
            return res.status(200).json({
                success : true,
                message : "Signature Verified and Course Added"
            })

        }
        catch(error)
        {
            console.error("Error enrolling user:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }   

    }
    else{
        return res.status(400).json({
          success: false,
          message: "Invalid Request",
         
      });
    }
    
}