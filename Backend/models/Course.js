const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    thumbnail: {
        type: String,
    },
    tag: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    whatYouWillLearn: {
        type: String,
    },
    courseContent: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Section",
        },
    ],
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    studentsEnroled: [
        {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
    ],
    createdAt: { 
        type: Date, default: Date.now 
    },
});

module.exports = mongoose.model('Course', courseSchema);
