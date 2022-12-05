import express from "express"
import { register, login, updateUser } from "../controllers/auth.controller.js"
import authenticateUser from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.put("/updateUser", authenticateUser, updateUser)


export default router;