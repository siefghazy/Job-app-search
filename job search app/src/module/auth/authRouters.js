import { Router } from "express";
import { signupScehma
    ,signinScehma } from "../validations/userValidations.js";
import { validate } from "../middlewares/validate.js";
import { signUp
    ,signIn } from "./auth.js";
export const authRouter=Router()
authRouter.route('/signup')
.post(validate(signupScehma),signUp)
authRouter.route('/signin').
get(validate(signinScehma),signIn)
