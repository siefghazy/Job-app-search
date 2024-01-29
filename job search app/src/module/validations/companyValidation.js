import joi from 'joi'
export const addCompanySchema=joi.object({
    body:{
        companyName:joi.string().required().max(60).min(2),
        description:joi.string().max(600),
        industry:joi.string(),
        address:joi.string().required(),
        numberOfEmployees:joi.number().required(),
        companyEmail:joi.string().email().required(),
        companyHR:joi.string().hex().length(24)
    }
})
export const updateCompanySchema=joi.object({
    body:{
        companyName:joi.string().required().max(60).min(2),
        description:joi.string().max(600),
        industry:joi.string(),
        address:joi.string(),
        numberOfEmployees:joi.number(),
        companyEmail:joi.string().email(),
        companyHR:joi.string().hex().length(24)
    }
})
export const searchCompanyScehma=joi.object({
    body:{
        companyName:joi.string().required().max(60).min(2)
    }
})