import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { updateUserSchema } from "../../validations/userValidations.js";
import { validate } from "../../middlewares/validate.js";
import { updateUser,deleteUser,getUser,getOther,updatePassword } from "../controllers/userControllers.js";
export const userRouter=Router()
userRouter
.route('/updateuser')
.put(validate(updateUserSchema),auth,updateUser)
userRouter
.route('/deleteuser')
.delete(auth,deleteUser)
userRouter
.route('/getuser')
.get(auth,getUser)
userRouter
.route('/getother/:id')
.get(auth,getOther)
userRouter
.route('/updatepassword')
.put(auth,updatePassword)