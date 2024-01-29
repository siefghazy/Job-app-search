import {AppError} from '../../../utils/asyncErrorHandler.js'
export const validate=(schema)=>{
    return(req,res,next)=>{
    const{error}=schema.validate({
        body:req.body
    },{abortEarly: false})
    if(error){
        throw new AppError(error,400)
    }
    next()
}}