const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {courseEnrollmentEmail,} = require("../mailTemplate/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mailTemplate/paymentSuccessEmail")


// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { courses } = req.body
  const userId = req.user.id
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0

  for (const course_id of courses) {
    let course
    try {
      // Find the course by its ID
      course = await Course.findById(course_id)

      // If the course is not found, return an error
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId)
      if (course.studentsEnroled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      }

      // Add the price of the course to the total amount
      total_amount += course.price
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    //console.log(paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const courses = req.body?.courses

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.name}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnroled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }
      //console.log("Updated course: ", enrolledCourse)

      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent)
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.title}`,
        courseEnrollmentEmail(
          enrolledCourse.title,
          enrolledStudent.name,
          
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}
















// const Course = require("../models/Course")
// const User = require("../models/User");
// const { instance } = require("../config/razorpay")
// const mailSender = require("../utils/mailSender")
// const mongoose = require("mongoose");
// const crypto = require("crypto");
// const {courseEnrollmentEmail} = require("../mailTemplate/courseEnrollmentEmail");



// // Capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {
//     const { courseId } = req.body; // Expecting a single course ID
//     const userId = req.user.id;
  
//     // Validate input
//     if (!courseId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid Course ID.',
//       });
//     }
  
//     try {
//       // Find the course by ID
//       const course = await Course.findById(courseId);
//       if (!course) {
//         return res.status(404).json({
//           success: false,
//           message: 'Course not found.',
//         });
//       }
  
//       // Check if the user is already enrolled in the course
//       const uid = new mongoose.Types.ObjectId(userId);
//       if (course.studentsEnroled.includes(uid)) {
//         return res.status(400).json({
//           success: false,
//           message: 'You are already enrolled in this course.',
//         });
//       }
  
//       // Create Razorpay order options
//       const options = {
//         amount: course.price * 100, // Convert to paise
//         currency: 'INR',
//         receipt: `receipt_${Date.now()}`,
//         notes : {
//           courseId,
//           userId
//         }
//       };
  
//       // Initiate the payment using Razorpay
//       const paymentResponse = await instance.orders.create(options);
//       console.log('Razorpay Order:', paymentResponse);
  
//       return res.status(200).json({
//         success: true,
//         data: paymentResponse,
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Could not process the payment.',
//       });
//     }
// };



// exports.verifySignature = async (req, res)=>{

//     const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
//     const signature = req.headers["x-razorpay-signature"];

//     // Generate hash using secret and request body
//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if (signature === digest) {
//         console.log("Payment is Authorised");

//         // Extract courseId and userId from the payload
//         const notes = req.body?.payload?.payment?.entity?.notes || {};
//         const { courseId, userId } = notes;

//         try {
//             // Validate courseId and userId
//             if (!courseId || !userId) {
//                 return res
//                 .status(400)
//                 .json({ success: false, message: "Missing courseId or userId" });
//             }

//             // Enroll the user in the course
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 { _id: courseId },
//                 { $push: { studentsEnroled: userId } },
//                 { new: true }
//             );

//             if (!enrolledCourse) {
//                 return res
//                 .status(404)
//                 .json({ success: false, message: "Course not found" });
//             }

//             // Update user's enrolled courses
//             const enrolledStudent = await User.findOneAndUpdate(
//                 { _id: userId },
//                 { $push: { courses: courseId } },
//                 { new: true }
//             );

//             if (!enrolledStudent) {
//                 return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//                 });
//             }

//             const mailResponse = await mailSender(
//                 enrolledStudent.email,
//                 `Successfully Enrolled into ${enrolledCourse.title}`,
//                 courseEnrollmentEmail(enrolledCourse.title, enrolledStudent.name) // Generate the email body using the template
//             );
//             console.log("Verification email sent successfully: ", mailResponse.response);


//             //return response
//             return res.status(200).json({
//                 success : true,
//                 message : "Signature Verified and Course Added"
//             })

//         }
//         catch(error)
//         {
//             console.error("Error enrolling user:", error);
//             return res.status(500).json({
//                 success: false,
//                 message: "Internal server error",
//                 error: error.message,
//             });
//         }   

//     }
//     else{
//         return res.status(400).json({
//           success: false,
//           message: "Invalid Request",
         
//       });
//     }
    
// }