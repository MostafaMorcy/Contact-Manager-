import Joi from "joi";
const signUpSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(4).required(),
});
const signInSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(4).required(),
});
export { signUpSchema, signInSchema };
