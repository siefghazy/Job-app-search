import jwt from 'jsonwebtoken'
import cloudinary from 'cloudinary'
import { userModel } from '../../user/models/userModel.js';
import { jobModel } from "../models/jobModel.js";
import { companyModel } from "../../company/models/companModel.js";
import { AppError,catchAsyncError } from "../../../../utils/asyncErrorHandler.js";
import{resumeModel}from'../../application/models/resumeModel.js'
import { applicationModel } from '../../application/models/applicationModel.js';
export const addJob=catchAsyncError(async(req,res,next)=>{
    const token=req.header('token')
    const{_id}=jwt.decode(token)
    const{role}=await userModel.findById(_id)
    if(role=='company_HR'){
        const{jobTtile,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills}=req.body
           await jobModel.create({jobTtile,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills,addBy:_id})
           return res.status(200).json({message:'job added succ..'})
    }
    throw new AppError('u must be HR',400)
})
export const updateJob=catchAsyncError(async(req,res,next)=>{
    const jobId=req.params.id
    const token=req.header('token')
    const{_id}=jwt.decode(token)
    const{role}=await userModel.findById(_id)
    if(role=="company_HR"){
        const{addBy}=await jobModel.findById(jobId)
        if(_id==addBy){
            await jobModel.findByIdAndUpdate(jobId,req.body)
           return res.status(200).json({message:'job updated succ..'})
        }
        throw new AppError("u don't have access to update this job",400)
    }
    throw new AppError('u must be HR',400)
})
export const deleteJob=catchAsyncError(async(req,res,next)=>{
    const jobId=req.params.id
    const token=req.header('token')
    const{_id}=jwt.decode(token)
    const{role}=await userModel.findById(_id)
    if(role=="company_HR"){
        const{addBy}=await jobModel.findById(jobId)
        if(_id==addBy){
            await jobModel.findByIdAndDelete(jobId)
            return res.status(200).json({message:'job deleted succ..'})
        }
        throw new AppError("u don't have access to delete this job",400)
    }
    throw new AppError('u must be HR',400)
})
export const getAllJobs=catchAsyncError(async(req,res,next)=>{
    let companyInfo=[]
    let companyData
    const token = req.header('token')
    const{_id}=jwt.decode(token)
    const{role}=await userModel.findById(_id)
    if(role=='company_HR'){
        const jobs=await jobModel.find()
        for (const job of jobs){
              const{addBy}=job
             companyData=await companyModel.find({companyHR:addBy})
             companyInfo.push(companyData)
        }
       return res.status(200).json({jobs,companyInfo})
    }
    if(role=='user'){
        const jobs=await jobModel.find()
        for (const job of jobs){
            const{addBy}=job
           companyData=await companyModel.find({companyHR:addBy})
           companyInfo.push(companyData)
      }
        companyInfo.forEach((company)=>{
            delete company._id
            delete company.numberOfEmployees
            delete company.companyHR
        })
       return res.status(200).json({jobs,comapnyinfo:companyInfo})
    }
})
export const jobFilter=catchAsyncError(async(req,res,next)=>{
    const token =req.header('token')
    const{_id}=jwt.decode(token)
    const{role}=await userModel.findById(_id)
    if(role=='company_HR'){
        const data=await jobModel.find().where(req.body)
       return res.status(200).json(data)
    }
    if(role=="user"){
        const data=await jobModel.find().where(req.body)
        for(const job of data){
            delete job.addBy
            delete job._id
        }
       return res.status(200).json(data)
    }
})
export const applyJob=catchAsyncError(async(req,res,next)=>{
    const jobId=req.params.id
    const token =req.header('token')
    const{_id}=jwt.decode(token)
     const files=req.files.resume
    files.forEach(async(element) => {
        const{path}=element
        console.log(path)
        const {asset_id,secure_url}=await cloudinary.v2.uploader.upload(path)
        await resumeModel.create({name:asset_id,path:secure_url})
    });
    await applicationModel.create({jobId,userId:_id})
    res.status(200).json({message:"application completed"})
})



