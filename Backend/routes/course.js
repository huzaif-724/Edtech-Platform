const express = require("express")
const router = express.Router();


const {createCourse, getAllCourses} = require("../controllers/course");
const {createCategory, showAllCategories} = require("../controllers/category")
const {createSection, updateSection, deleteSection} = require("../controllers/section")
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/subSection")

const {auth, isInstructor, isStudent} = require("../middlewares/auth");

router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getAllCourses",  getAllCourses)
router.post("/createSection", auth, isInstructor, createSection)
router.post("/updateSection", auth, isInstructor, updateSection)
router.post("/deleteSection", auth, isInstructor, deleteSection)
router.post("/createSubSection", auth, isInstructor, createSubSection)
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)


router.post("/createCategory", auth, isInstructor, createCategory)
router.get("/showAllCategories",  showAllCategories)





module.exports = router;