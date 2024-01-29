import joi from "joi";
export const signupScehma=joi.object({
    body:{
        firstname:joi.string().max(30).min(2).required(),
        lastname:joi.string().max(30).min(2).required(),
        email:joi.string().email().required(),
        password:joi.string().required(),
        recoveryemail:joi.string().email(),
        DOB:joi.date(),
        mobileNumber:joi.string().required(),
        role:joi.string(),
    }
})
export const signinScehma=joi.object({
    body:{
        mobileNumber:joi.string(),
        password:joi.string(),
        email:joi.string().email()
    }
})
export const updateUserSchema=joi.object({
    body:{
        firstname:joi.string().max(30).min(2),
        lastname:joi.string().max(30).min(2),
        email:joi.string().email(),
        password:joi.string(),
        recoveryemail:joi.string().email(),
        DOB:joi.date(),
        mobileNumber:joi.string(),
        role:joi.string(),
        status:joi.string()
    }
})
export const updatePassword=joi.object({
    body:{
        password:joi.string()
    }
})

