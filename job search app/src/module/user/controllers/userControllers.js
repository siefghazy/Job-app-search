import jwt from 'jsonwebtoken'
import bycrpt from 'bcrypt'
import { catchAsyncError,AppError } from "../../../../utils/asyncErrorHandler.js";
import { userModel } from "../models/userModel.js";
export const updateUser=catchAsyncError(async(req,res,next)=>{
    const token=req.header('token')
    const{_id}=jwt.decode(token)
    const{email , mobileNumber , recoveryEmail , DOB , lastname , firstname}=req.body
    const data = await userModel.findById(_id)
    if(data){
        if(data.status=='online'){
        if(email){
            const emailChecker=await userModel.findOne({email})
            if(!emailChecker){
                await userModel.findByIdAndUpdate(_id,{email})
                return res.status(200).json({message:'user updated ..'})
            }
            throw new AppError('choose another email',400)
        }
        if(mobileNumber){
            const mobileNumberChecker=await userModel.findOne({mobileNumber})
            if(!mobileNumberChecker){
                await userModel.findByIdAndUpdate(_id,{mobileNumber})
                return res.status(200).json({message:'user updated ..'})
            }
            throw new AppError("choose another phone number",400)
        }
        const  fullname=firstname+" "+lastname
        await userModel.findByIdAndUpdate(_id,{recoveryEmail , DOB , lastname , firstname,fullname})
        return res.status(200).json({message:'user updated ..'})
}
throw new AppError("u must log in first",400)
}
throw new AppError("user does not exist",400)
})
export const deleteUser=catchAsyncError(async(req,res,next)=>{
    const token=req.header('token')
    const{_id}=jwt.decode(token)
    const {status}= await userModel.findById(_id)
    if(status=='online'){
        await userModel.findByIdAndDelete(_id)
        return res. status(200).json({message:"user deleted succ"})
    }
    throw new AppError("u must log in first",400)
})
export const getUser=catchAsyncError(async(req,res,next)=>{
    const token=req.header('token')
    const{_id}=jwt.decode(token)
    const data=await userModel.findById(_id)
    const {status}=await userModel.findById(_id)
    if(status=='online'){
        return res.status(200).json(data)
    }
    throw new AppError('u must log in ',400)
})
export const getOther=catchAsyncError(async(req,res,next)=>{
    const id=req.params.id
    const {fullname, DOB,email}=await userModel.findById(id)
    res.status(200).json({fullname, DOB,email})
})
export const updatePassword=catchAsyncError(async(req,res,next)=>{
    const token=req.header('token')
    const{_id,password}=jwt.decode(token)
    const updatePassword=req.body.password
    if(!bycrpt.compareSync(updatePassword,password)){
    const hashedPassword=bycrpt.hashSync(updatePassword,parseInt(process.env.SALT_NUMBER))
    await userModel.findByIdAndUpdate(_id,{password:hashedPassword})
    return res.status(200).json("user updated succ..")
    }
    throw new AppError("choose another password",400)
})