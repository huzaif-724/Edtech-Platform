const bcrypt = require("bcrypt");
const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
require("dotenv").config();


exports.signup = async (req, res)=>{

    try{
        const {
            name,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
          } = req.body
          // Check if All Details are there or not
          if (
            !name ||
            !email ||
            !password ||
            !confirmPassword ||
            !otp
          ) {
            return res.status(403).send({
              success: false,
              message: "All Fields are required",
            })
          }
    
    
          // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({
              success: false,
              message:
                "Password and Confirm Password do not match. Please try again.",
            })
        }
    
        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "User already exists. Please sign in to continue.",
          })
        }
    
        // Find the most recent OTP for the email
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
        console.log(response)
        if (response.length === 0) {
          // OTP not found for the email
          return res.status(400).json({
            success: false,
            message: "The OTP is not valid",
          })
        } else if (otp !== response[0].otp) {
          // Invalid OTP
          return res.status(400).json({
            success: false,
            message: "The OTP is not valid",
          })
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            accountType: accountType,
            isVerified: true,
        })
    
        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        })
    }
    catch(error)
    {
        console.error(error)
        return res.status(500).json({
        success: false,
        message: "User cannot be registered. Please try again.",
        })
    }
}


exports.login = async(req, res)=>{

   try{
        const {email, password} = req.body;

        if(!email || !password)
        {
            return res.status(400).send({
                success: false,
                message: "All Fields are required",
            })
        }

        const user = await User.findOne({email});
        
        if(!user)
        {
            return res.status(403).send({
                success: false,
                message: "User is not registered",
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        //generate token
        const token = jwt.sign(
            {
                email : user.email,
                id : user._id,
                accountType: user.accountType
            },
            process.env.JWT_SECRET,
            {
                expiresIn : "24h",
            }
        )

        user.token = token;
        user.password = undefined

        // Set cookie for token and return success response
        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            httpOnly: true,
        };
        
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: `User Login Success`,
        })
   }
   catch(error){

        console.error(error)
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
        })
   }
}

exports.logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "Lax", // Change to "None" in production
    });
    

    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};



// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
    try{

        const { email } = req.body
    
        // Check if user is already present
        const checkUserPresent = await User.findOne({ email })
    
        // If user found with provided email
        if (checkUserPresent) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
            success: false,
            message: `User is Already Registered`,
            })
        }
    
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })
        const result = await OTP.findOne({ otp: otp })

        while (result) {
            otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            })
        }
        const otpPayload = { email, otp }
        const otpBody = await OTP.create(otpPayload)
        
        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            otp,
        })
    } 
    catch (error){
        console.log(error.message)
        return res.status(500).json({ 
            success: false, error: error.message 
        })
    }
}