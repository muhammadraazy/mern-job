import { BadRequestError, UnauthenticatedError } from "../errors/index.js"
import { StatusCodes } from "http-status-codes"
import { Job } from "../models/job.model.js" 
import { checkPermissions } from "../utils/checkPermission.js"
import mock_data from "../MOCK_DATA.js"
import mongoose from "mongoose"
import moment from "moment"

// create job
const createJob = async(req, res) => {
    const { position, company } = req.body

    if(!position || !company) {
        throw new BadRequestError('please provide all values')
    }

    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)

    res.status(StatusCodes.CREATED).json(job)

}   

// get all jobs
const getAllJobs = async(req, res) => {
    const { status, jobType, sort, search } = req.query;

    const queryObject = {
        createdBy: req.user.userId
    }

    if(status && status !== 'all') {
        queryObject.status = status
    }

    if(jobType && jobType !== 'all') {
        queryObject.jobType = jobType;
    }

    if(search) {
        queryObject.position = { $regex: search, $options: 'gi' }
    }

    let result = Job.find(queryObject)

    switch(sort) {
        case 'latest':
            result = result.sort({ createdAt: 1 })
        case 'oldest':
            result = result.sort({ createdAt: -1 })
        case 'a-z':
            result = result.sort({ createdAt: 1 })
        case 'z-a':
            result = result.sort({ createdAt: -1 })
        default:
            result = result.sort({ createdAt: 1 })
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit)

    const totalJobs = await Job.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalJobs / limit) ;

    const jobs = await result
    res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
}

// update job
const updateJob = async(req, res) => {
    const { id: jobId } = req.params;
    const { position, company } = req.body;

    if(!position || !company) {
        throw new BadRequestError('please provide all values')
    }

    const job = await Job.findOne({ _id: jobId });

    if(!job) {
         throw new NotFoundError(`no job with id ${jobId}`)
    }

    checkPermissions(req.user, job.createdBy)

    const updateJob = await Job.findByIdAndUpdate({ _id: jobId }, req.body, {
        new: true,
        runValidators: true
    })

    res.status(StatusCodes.OK).json(updateJob)
}


// delete job
const deleteJob = async(req, res) => {
    const { id: jobId } = req.params;
    const job = await Job.findOne({ _id: jobId });

    if(!job) {
         throw new NotFoundError(`no job with id ${jobId}`)
    }

    checkPermissions(req.user, job.createdBy)
    await job.remove()

    res.status(StatusCodes.OK).json({ msg: "Success, job removed" })
}

// show stats
const showStats = async(req, res) => {
    let stats = await Job.aggregate([
         { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
         { $group: { _id: '$status', count: { $sum: 1 } } }
    ])

    let arr = [1, 2, 3, 4, 5, 6]

    stats = stats.reduce((acc, curr) => {
         const { _id: title, count } = curr;
         acc[title] = count;

         return acc;
    }, {})

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0
    }

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, count: { $sum: 1 } } },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 10 }
    ])

    monthlyApplications = monthlyApplications.map(item => {
         const { _id: { year, month }, count } = item;
         const date = moment().month(month - 1).year(year).format('MMM Y')

         return { date, count}
    }).reverse()
    res.status(StatusCodes.OK).json({defaultStats, monthlyApplications})
}


export { createJob, getAllJobs, updateJob, deleteJob, showStats}