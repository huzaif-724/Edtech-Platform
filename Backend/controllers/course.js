const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const {uploadImageToCloudinary} = require("../utils/imageUploader")
require("dotenv").config();

exports.createCourse = async (req, res) =>{

    try{

        const userId = req.user.id;
        const {title, description, price, whatYouWillLearn, tag, category} = req.body;
        const thumbnail = req.files.thumbnailImage;

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


