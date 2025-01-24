const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender"); // Utility for sending emails
const emailTemplate = require("../mailTemplate/MailTemp"); // Email template for OTP verification

// Define the OTP Schema
const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // Document will expire and be deleted after 5 minutes
    },
});

// Function to send verification email
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Email Verification",
            emailTemplate(otp) // Generate the email body using the template
        );
        console.log("Verification email sent successfully: ", mailResponse.response);
    } catch (error) {
        console.error("Error occurred while sending verification email: ", error);
        throw error;
    }
}

// Pre-save middleware to send email after the OTP document is created
OTPSchema.pre("save", async function (next) {
    console.log("Saving new OTP document to the database");

    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

// Create the OTP model
const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
