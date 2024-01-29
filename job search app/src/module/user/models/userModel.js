import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    firstname:{
        type:String,
        max:30,
        min:2,
        required:true
    },
    lastname:{
        type:String,
        max:30,
        min:2,
        required:true
    },
    fullname:{
        type:String,
        max:60,
        min:2
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    recoveryemail:{
        type:String,
    },
    DOB:{
        type:Date
    },
    mobileNumber:{
        type:String,
        unique:true,
        required:true
    },
    role:{
        type:String,
        enum:['user','company_HR'],
        default:'user'
    },
    status:{
        type:String,
        enum:['online','offline'],
        default:'offline'
    },  
},{timestamps:true})
userSchema.pre('save',function(next){
    this.fullname=this.firstname+" "+this.lastname
    next()
})
userSchema.virtual('companyName').get(function(){
    return this.company
})
export const userModel=mongoose.model('user',userSchema)
