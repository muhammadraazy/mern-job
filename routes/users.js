import { Users } from "../models/users.js"
import express from "express";
import { getUsers, deleteUsers } from "../controllers/user.js"

const router = express.Router()

router.get("/", getUsers)
router.delete("/:id", deleteUsers)

export default router;