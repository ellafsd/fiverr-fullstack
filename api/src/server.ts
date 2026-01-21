import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import authRoutes from "./routes/auth.route.js"
import gigRoutes from "./routes/gig.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import { config, isDevelopment } from "./config/environment.js";
import errorHandler from "./middlewares/errorHandler.js";



// Load environment variables from .env file
dotenv.config();


//Connect to MongoDB
mongoose
.connect(process.env.MONGO_URI as string)
.then(()=> console.log("🔥 Connection to DB is successfull"))
.catch( ()=> console.log("👎 Connection to DB is unsuccessfull"))


// Initialize Express application
const app = express();


// Global middlewares
app.use( cors({
    origin: config.CROSS_ORIGIN,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());


// Routes
app.get("/", (req,res)=>{
    res.json({messages: "Connected to Back end"})
})

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);


// Global error handling middleware
app.use(errorHandler)


// Start the server
app.listen(process.env.PORT, ()=>{
    console.log(`✅ Server is listeng ${process.env.PORT} port`)
})