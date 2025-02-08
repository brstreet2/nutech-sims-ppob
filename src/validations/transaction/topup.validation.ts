import { Request } from "express";
import Joi from "joi";

const topUpSchema = Joi.object({
  top_up_amount: Joi.number().greater(0).required().messages({
    "any.required": "Parameter top_up_amount harus di isi",
    "number.base":
      "Parameter top_up_amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
    "number.greater":
      "Parameter top_up_amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
  }),
});

export const validateTopUpBody = (body: Request) => {
  return topUpSchema.validate(body, { abortEarly: true });
};
