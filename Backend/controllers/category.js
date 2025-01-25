const Category = require("../models/Category");


exports.createCategory = async (req, res) => {
    try {
      const { name, description } = req.body
      if (!name) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" })
      }
      const CategorysDetails = await Category.create({
        name: name,
        description: description,
      })
      console.log(CategorysDetails)
      return res.status(200).json({
        success: true,
        message: "Categorys Created Successfully",
      })
    } catch (error) {
      return res.status(500).json({
        success: true,
        message: error.message,
      })
    }
  }


  exports.showAllCategories = async (req, res) => {
    try {
      const allCategorys = await Category.find()
      res.status(200).json({
        success: true,
        data: allCategorys,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}

exports.categoryPageDetails = async (req, res) => {
  try {
      const { categoryId } = req.body

      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate("courses")
        .exec()

      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }

      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
          return res.status(404).json({
            success: false,
            message: "No courses found for the selected category.",
        })

      }

      res.status(200).json({
        success: true,
        data: {
          selectedCategory
        },
      })
  }
  catch(error)
  {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}