import { Request } from "express";
import Joi from "joi";

const updateProfileSchema = Joi.object({
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
});

export const validateUpdateProfileBody = (body: Request) => {
  return updateProfileSchema.validate(body, { abortEarly: true });
};
