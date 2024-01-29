import mongoose from "mongoose";
const jobSchema=new mongoose.Schema({
    jobTitle:{
        type:String,
        required:true
    },
    jobLocation:{
        type:String,
        enum:['onsite','remotely','hybrid'],
        required:true
    },
    workingTime:{
        type:String,
        enum:['part-time','full-time'],
        required:true
    },
    seniorityLevel:{
        type:String,
        enum:['junior','mid-level','senior-level','team lead','CTO'],
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    technicalSkills:[{
        skill:{
            type:String,
            required:true
        }
    }
    ],
    softSkills:[
        {
            skill:{
                type:String,
                required:true
            }
        }
    ],
    addBy:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    }
})
export const jobModel=mongoose.model('job',jobSchema)