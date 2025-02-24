const Course = require("../models/Course");
const User = require("../models/User");
const Section = require("../models/Section");
const SubSection = require("../models/subSection")
const Category = require("../models/Category");
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const {convertSecondsToDuration} = require("../utils/secToDuration")
require("dotenv").config();

exports.createCourse = async (req, res) =>{

    try{

        const userId = req.user.id;
        const {title, description, price, whatYouWillLearn, tag, category} = req.body;
        const thumbnail = req.files?.thumbnail;

        if(!title || !description || !price || !whatYouWillLearn || !tag || !category || !thumbnail)
        {
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            })
        }

        const instructorDetails = await User.findById(userId)

        if(!instructorDetails)
        {
            return res.status(400).json({
                success: false,
                message: "Instructor Details not found",
            })
        }

         // Check if the tag given is valid
        const categoryDetails = await Category.findById(category)
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            })
        }

        // Upload the Thumbnail to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );

        const newCourse = await Course.create({
            title : title,
            description : description,
            price : price,
            instructor : instructorDetails._id,
            whatYouWillLearn : whatYouWillLearn,
            tag : tag,
            category : categoryDetails._id,
            thumbnail : thumbnailImage.secure_url,   
        })

        await User.findByIdAndUpdate(
            {_id : instructorDetails._id},
            {
               $push : {
                   courses : newCourse._id,
               }
            },
            {new : true},
        )

        await Category.findByIdAndUpdate(
            {_id : categoryDetails._id},
            {
                $push : {
                    courses : newCourse._id,
                }
            },
            {new : true},
        )

        return res.status(200).json({
            success : true,
            message : "Course created Successfully",
            data : newCourse,
        })


    }
    catch(error)
    {
        console.log('error :>> ', error);
        return res.status(500).json({
            success : false,
            message : "Failed to create Course",
            
        })

    }
}


// Get Course List
exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find()
            .populate("instructor")
            .populate("category")
            .exec()
    
        return res.status(200).json({
            success: true,
            data: allCourses,
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success: false,
            message: `Can't Fetch Course Data`,
            error: error.message,
      })
    }
}


exports.getCourseDetails = async (req, res)=>{

   try{
        const {courseId} = req.body;

        const courseDetails = await Course.findById(courseId)
                            .populate("instructor")
                            .populate("category")
                            .populate(
                                {
                                    path : "courseContent",
                                    populate : {
                                        path : "subSection"
                                    }
                                }
                            )
                            .exec();
                            
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            message : "Course Details Fetched Successfully",
            data: {
              courseDetails,
              totalDuration,
            },
        })

   }
   catch(error)
   {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
   }
}


// Edit Course Details
exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ 
            error: "Course not found" 
        })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {   
            course[key] = updates[key]    
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate("instructor")
        .populate("category")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      return res.status(200).json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}

// Delete the Course
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body
    
        // Find the course
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ 
                message: "Course not found" 
            })
        }

      // Check if the logged-in user is the instructor of the course
        if (String(course.instructor) !== String(req.user.id)) {
            return res.status(403).json({
            success: false,
            message: "You are not authorized to delete this course",
            });
        }
  
        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnroled
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
            $pull: { courses: courseId },
            })
        }
    
        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }
    
            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }
    
        // Delete the course
        await Course.findByIdAndDelete(courseId)
    
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}



exports.getEnrolledCourses = async (req, res) =>{

   try{
    
        const userId = req.user.id;
        let userDetails = await User.findOne({ _id: userId })
            .populate({
                path: "courses",
                populate: [
                    {
                        path: "courseContent",
                        populate: { path: "subSection" }
                    },
                    { path: "instructor" }
                ]
            })
            .exec();
    

        if (!userDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find user with id: ${userDetails}`,
            })
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
            
   }
   catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
   }

}


// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
}



exports.getFullCourseDetails = async (req, res)=>{

    try{
        const { courseId } = req.query;
 
         const courseDetails = await Course.findById(courseId)
                             .populate("instructor")
                             .populate("category")
                             .populate(
                                 {
                                     path : "courseContent",
                                     populate : {
                                         path : "subSection"
                                     }
                                 }
                             )
                             .exec();
                             
         if (!courseDetails) {
             return res.status(400).json({
                 success: false,
                 message: `Could not find course with id: ${courseId}`,
             })
         }
 
         let totalDurationInSeconds = 0
         courseDetails.courseContent.forEach((content) => {
             content.subSection.forEach((subSection) => {
                 const timeDurationInSeconds = parseInt(subSection.timeDuration)
                 totalDurationInSeconds += timeDurationInSeconds
             })
         })
 
         const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
 
         return res.status(200).json({
             success: true,
             message : "Course Details Fetched Successfully",
             data: {
               courseDetails,
               totalDuration,
             },
         })
 
    }
    catch(error)
    {
         return res.status(500).json({
             success: false,
             message: error.message,
         })
    }
}
  


exports.erolledStudent = async( req, res)=>{

    try{

        const {courseId} = req.body;
        const userId = req.user;

        await Course.findByIdAndUpdate(courseId,
            {
                $push : {
                    studentsEnroled : userId,
                }
             },
             {new : true},   
        )

        await User.findByIdAndUpdate(userId,
            {
                $push : {
                    courses : courseId,
                }
            },
            {new : true}
        )

        return res.status(200).json({
            success : true,
            message : "Course enrolled Successfully"
        })

    }
    catch(error)
    {
        return res.status(200).json({
            success : true,
            message : "Course enrolled Successfully"
        })
    }
}