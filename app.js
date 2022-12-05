import express from "express";
import dotenv from "dotenv"
import "express-async-errors"
import dbConnection from "./dbConnect.js"

import morgan from "morgan"
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/error-handler.js";
import authenticateUser from "./middlewares/auth.middleware.js"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import jobsRoutes from "./routes/jobs.routes.js"
import path from "path"

import helmet from "helmet"
import xss from "xss-clean"
import mongoSanitize from "express-mongo-sanitize"
import rateLimit from "express-rate-limit"
import { fileURLToPath } from "url";

dotenv.config()
const app = express();
const PORT = process.env.PORT;
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: "Too many requests from the same Ip address, try again later 15 minutes" })
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(limiter)
app.use(express.json())
// app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())

if(process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"))
}

dbConnection()


app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/jobs", authenticateUser, jobsRoutes)

// if route is not the same like server route then always redirect to front end app;
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
// })

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`server running now on port ${PORT}`))