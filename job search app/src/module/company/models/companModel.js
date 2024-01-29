import mongoose from "mongoose";
const companySchema=new mongoose.Schema({
    companyName:{
        type:String,
        unique:true,
        required:true,
        max:60,
        min:2
    },
    description:{
        type:String,
        max:600,
    },
    industry:{
        type:String
    },
    address:{
        type:String,
        required:true
    },
    numberOfEmployees:{
        type:Number,
        validate:{
            validator:(value)=>{
                return value>=11&&value<=20
            }
        },
        required:true
    },
    companyEmail:{
        type:String,
        unique:true,
        required:true
    },
    companyHR:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    }
},{timestamps:true})
export const companyModel=mongoose.model('company',companySchema)
