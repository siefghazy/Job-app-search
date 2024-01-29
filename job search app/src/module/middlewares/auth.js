import Jwt  from "jsonwebtoken"
import env from'dotenv'
import { AppError } from "../../../utils/asyncErrorHandler.js"
env.config()
export const auth=(req,res,next)=>{
const token=req.header('token')
if(!token){
    throw new AppError('unauthorized',400)
}
Jwt.verify(token,process.env.SECRET_KEY,(error,decodedToken)=>{
    if(error){
        console.log(error)
        throw new AppError('wrong token',400)
    }
    next()
})
}