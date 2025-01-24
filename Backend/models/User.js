const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: ['Student', 'Instructor'],
        default: 'Student',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    courses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
    ],
    token: {
        type: String,
    },
},
);

module.exports = mongoose.model('User', userSchema);
