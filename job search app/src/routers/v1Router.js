import { Router } from "express";
import { authRouter } from "../module/auth/authRouters.js";
import { userRouter } from "../module/user/routes/userRouter.js";
import { jobRouter } from "../module/job/routers/jobRouter.js";
import { companyRouter } from "../module/company/routers/companyRouter.js";
export const v1Router=Router()
v1Router.use('/auth',authRouter)
v1Router.use('/user',userRouter)
v1Router.use('/job',jobRouter)
v1Router.use('/company',companyRouter)