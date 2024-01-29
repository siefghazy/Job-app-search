import mongoose from "mongoose";
const resumeScehma=new mongoose.Schema({
    name:{
        type:String,
        path:String
    }
})
export const resumeModel=mongoose.model('resume',resumeScehma)