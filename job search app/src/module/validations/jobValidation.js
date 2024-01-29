import joi from 'joi'
export const addJobScehma=joi.object({
    body:{
        jobTitle:joi.string(),
        jobLocation:joi.string().required(),
        workingTime:joi.string().required(),
        seniorityLevel:joi.string().required(),
        jobDescription:joi.string().required(),
        technicalSkills:joi.array().items(joi.object({
            skill:joi.string().required()
        })),
        softSkills:joi.array().items(joi.object({
            skill:joi.string().required()
        })),
        addBy:joi.string().hex().length(24)
    }
})
export const updateJobSvhema=joi.object({
    body:{
        jobTitle:joi.string(),
        jobLocation:joi.string(),
        workingTime:joi.string(),
        seniorityLevel:joi.string(),
        jobDescription:joi.string(),
        technicalSkills:joi.array().items(joi.object({
            skill:joi.string()
        })),
        softSkills:joi.array().items(joi.object({
            skill:joi.string()
        })),
        addBy:joi.string().hex().length(24)
    }
})