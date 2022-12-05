import { createJob, getAllJobs, updateJob, deleteJob, showStats} from "../controllers/jobs.controller.js"
import express from "express"
const router = express.Router()

router.post("/", createJob)
router.get("/", getAllJobs)
router.put("/:id", updateJob)
router.delete("/:id", deleteJob)
router.get("/stats", showStats)

export default router