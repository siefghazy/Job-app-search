import mongoose from "mongoose";
const applicationScehma=new mongoose.Schema({
    jobId:{
        type:mongoose.Schema.ObjectId,
        ref:'job'
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    userTechSkills:[
        {
            skills:{
                type:String
            }
        }
    ],
    resume:{
        type:mongoose.Schema.ObjectId,
        ref:'resume'
    }
})
export const applicationModel=mongoose.model('application',applicationScehma)