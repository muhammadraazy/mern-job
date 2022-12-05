import mongoose from "mongoose"

const JobSchema = new mongoose.Schema({
     company: {
        type: String,
        required: [true, 'please provide a company'],
        maxLength: 50
     },
     position: {
        type: String,
        required: [true, 'please provide a position'],
        maxLength: 100
     },
     status: {
        type: String,
        enum: ["interview", 'declined', 'pending'],
        required: [true, 'please provide a status'],
        default: "pending"
     },
     jobType: {
        type: String,
        enum: ["full-time", 'part-time', 'remote', 'internship'],
        required: [true, 'please provide a job type'],
        default: "full-time"
     },
     jobLocation: {
        type: String,
        default: "jakarta",
        required: true
     },
     createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, 'please provide a user']
     }
}, { timestamps: true })


export const Job = mongoose.model("Job", JobSchema)