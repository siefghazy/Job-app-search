import { Router } from "express";
import { addJobScehma,updateJobSvhema } from "../../validations/jobValidation.js";
import { validate } from "../../middlewares/validate.js";
import { addJob,updateJob,deleteJob,getAllJobs,jobFilter,applyJob } from "../controllers/jobControllers.js";
import { auth } from "../../middlewares/auth.js";
import imageUpload from "../../middlewares/multerMiddleware.js";
export const jobRouter=Router()
jobRouter
.route('/addjob')
.post(validate(addJobScehma),auth,addJob)
jobRouter
.route('/updatejob/:id')
.put(validate(updateJobSvhema),auth,updateJob)
jobRouter
.route('/deletejob/:id')
.delete(deleteJob)
jobRouter
.route('/getalljobs')
.get(auth,getAllJobs)
jobRouter
.route('/jobfilter')
.get(auth,jobFilter)
jobRouter
.route('/applyjob/:id')
.post(imageUpload,auth,applyJob)
