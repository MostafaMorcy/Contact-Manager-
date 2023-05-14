import express from "express";
import { validation } from "../../middleware/validation.js";
import * as authController from "./auth.controller.js";
import { signInSchema, signUpSchema } from "./auth.validation.js";
export const authRouter = express.Router();
authRouter.post("/signUp", validation(signUpSchema), authController.signUp);
authRouter.post("/signIn", validation(signInSchema), authController.signIn);
authRouter.post("/login", authController.login);
