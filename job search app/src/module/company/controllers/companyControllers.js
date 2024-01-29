import jwt from "jsonwebtoken"
import { catchAsyncError,AppError } from "../../../../utils/asyncErrorHandler.js";
import { companyModel } from "../models/companModel.js";
import { userModel } from "../../user/models/userModel.js";
import { jobModel } from "../../job/models/jobModel.js";
import { applicationModel } from "../../application/models/applicationModel.js";
export const addCompany=catchAsyncError(async(req,res,next)=>{
    const token=req.header('token')
    const{_id}=jwt.decode(token)
    const{role}=await userModel.findById(_id)
    if(role=='company_HR'){
        const{companyName,description,industry,address,numberOfEmployees,companyEmail}=req.body
        await companyModel.create({companyName,description,industry,address,numberOfEmployees,companyEmail,companyHR:_id})
        res.status(200).json({message:"company added succ.."})
    }
    throw new AppError("u must be HR",400)
})
export const updateCompany = catchAsyncError(async(req,res,next)=>{
    const companyID=req.params.id
    const token=req.header('token')
    const{_id}=jwt.decode(token)
    const{role}=await userModel.findById(_id)
    if(role=='company_HR'){
        const data= await companyModel.findOne({companyHR:_id})
        if(data._id==companyID){
            const{companyName}=req.body
            if(companyName){
            const checkUnique=await companyModel.findOne({companyName})
            if(!checkUnique){
            await companyModel.findByIdAndUpdate(companyID,req.body)
            return res.status(200).json({message:"company info  updated.."})
        }}
            await companyModel.findByIdAndUpdate(companyID,req.body)
            return res.status(200).json({message:"company info  updated.."})
        }
    }
    throw new AppError("u must be HR",400)
})
export const deleteCompany=catchAsyncError(async(req,res,next)=>{
    const token=req.header('token')
    const{_id}=jwt.decode(token)
    const{role}=await userModel.findById(_id)
    if(role=='company_HR'){
        const data= await companyModel.find().where({companyHR:_id})
        if(data){
            const{companyName}=data
            await companyModel.findOneAndDelete({companyName})
            res.status(200).json({message:"company deleted.."})
        }
    }
    throw new AppError('u must be HR',400)
})
export const getCompany=catchAsyncError(async(req,res,next)=>{
    const id = req.params.id
    const token=req.header('token')
    const{_id}=jwt.decode(token)
    const{role}=await userModel.findById(_id)
    const{companyHR}=await companyModel.findById(id)
    if(role=='company_HR'){
        const jobs= await jobModel.find().where({addBy:companyHR})
        const data =await companyModel.findById(id)
       return res.status(200).json({data,jobs})
    }
    throw new AppError('u must be HR',400)
})
export const searchCompany=catchAsyncError(async(req,res,next)=>{
    const token=req.header('token')
    const{_id}=jwt.decode(token)
    const{role}=await userModel.findById(_id)
    const {companyName}=req.body
    if(role=='company_HR'){
        const lowerCaseName=companyName.toLowerCase()
        const data=await companyModel.findOne({companyName:lowerCaseName})
        res.status(200).json(data)
    }
    if(role=='user'){
        const lowerCaseName=companyName.toLowerCase()
        const{description,industry,address,comapnyEmail}=await companyModel.findOne({companyName:lowerCaseName})
        res.status(200).json({description,industry,address,comapnyEmail})
    }
})
export const getApplications=catchAsyncError(async(req,res,next)=>{
    let applicationsArray=[]
    const token= req.header('token')
    const{_id}=jwt.decode(token)
    const {role}=await userModel.findById(_id)
    if(role=='company_HR'){
        const data=await companyModel.findOne({companyHR:_id})
        if(data){
            const jobs= await jobModel.find().where({addBy:_id})
            for(const e of jobs){
                const{_id:jobId}=e
                const app=await applicationModel.find().where({jobId}).populate('userId')
                if(app){ applicationsArray.push(app)}
            }
            const apps=applicationsArray
            return res.status(200).json({apps})
        }
    }
    throw new AppError("u must be HR",400)
})

