import env from"dotenv"
import express from 'express'
import {v2 as cloudinary} from 'cloudinary';
import {AppError}from'../job search app/utils/asyncErrorHandler.js'
import { v1Router } from "./src/routers/v1Router.js"
env.config()
export const bootstrap=(app)=>{
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
      })
    app.use(express.json())
    app.use('/api/v1router',v1Router)
    app.all('*',(req,res,next)=>{
        throw new AppError("route not found",500)
    })
    //global error handler
    app.use((err, req, res, next) => {
        const { message, status, stack } = err
        res.status(status || 500).json({
            message,
            ...(process.env.MODE === 'development' && { stack }),
        })
    })
    app.listen(process.env.PORT_NUMBER,()=>{console.log("server is running..GG")})
}