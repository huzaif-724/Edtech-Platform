// Import the required modules
const express = require("express")
const router = express.Router()
const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/payments")
const { auth, isStudent } = require("../middlewares/auth")
router.post("/capturePayment", auth, isStudent, capturePayment) //isStudent
router.post("/verifyPayment", auth, isStudent, verifyPayment) //isStudent
router.post("/sendPaymentSuccessEmail", auth, sendPaymentSuccessEmail) //isStudent


module.exports = router
