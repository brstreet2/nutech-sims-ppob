import { Request } from "express";
import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Parameter email harus di isi",
    "string.empty": "Parameter email harus di isi",
    "string.email": "Paramter email tidak sesuai format",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Parameter password harus di isi",
    "string.empty": "Parameter password harus di isi",
    "string.min": "Password length minimal 8 karakter",
  }),
});

export const validateLoginBody = (body: Request) => {
  return loginSchema.validate(body, { abortEarly: true });
};
