import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { auth } from "../../middlewares/auth.js";
import { addCompanySchema,updateCompanySchema,searchCompanyScehma } from "../../validations/companyValidation.js";
import { addCompany,updateCompany,searchCompany,getApplications,getCompany, deleteCompany } from "../controllers/companyControllers.js";
export const companyRouter=Router()
companyRouter
.route('/addcompany')
.post(validate(addCompanySchema),auth,addCompany)
companyRouter
.route('/updatecompany/:id')
.put(validate(updateCompanySchema),auth,updateCompany)
companyRouter
.route('/getapplications')
.get(auth,getApplications)
companyRouter
.route('/getcompany/:id')
.get(auth,getCompany)
companyRouter
.route('/searchcompany')
.get(validate(searchCompanyScehma),auth,searchCompany)
companyRouter
.route('/deletecompany')
.delete(auth,deleteCompany)