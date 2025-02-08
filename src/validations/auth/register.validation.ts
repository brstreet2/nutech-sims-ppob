import { Request } from "express";
import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Parameter email harus di isi",
    "string.empty": "Parameter email harus di isi",
    "string.email": "Paramter email tidak sesuai format",
  }),
  first_name: Joi.string().min(1).required().messages({
    "any.required": "Parameter first_name harus di isi",
    "string.empty": "Parameter first_name harus di isi",
    "string.min": "Parameter first_name harus di isi",
  }),
  last_name: Joi.string().min(1).required().messages({
    "any.required": "Parameter last_name harus di isi",
    "string.empty": "Parameter last_name harus di isi",
    "string.min": "Parameter last_name harus di isi",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Parameter password harus di isi",
    "string.empty": "Parameter password harus di isi",
    "string.min": "Password length minimal 8 karakter",
  }),
});

export const validateRegisterBody = (body: Request) => {
  return registerSchema.validate(body, { abortEarly: true });
};
