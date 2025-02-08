import { Request, Response } from "express";
import { validateRegisterBody } from "../../validations/auth/register.validation";
import { registerUser } from "../../services/auth.service";
import { RegisterUserDto } from "../../dtos/auth/registerDto";

export const register = async (req: Request, res: Response) => {
  const { error } = validateRegisterBody(req.body);

  if (error) {
    return res.status(400).json({
      status: 102,
      message: error.details[0].message,
      data: null,
    });
  }

  const { email, first_name, last_name, password }: RegisterUserDto = req.body;

  try {
    const user = await registerUser({ email, first_name, last_name, password });
    res.status(200).json({
      status: 0,
      message: "Registrasi berhasil silahkan login",
      data: null,
    });
  } catch (error: any) {
    if (error.message === "Email sudah terdaftar") {
      return res.status(400).json({
        status: 102,
        message: error.message,
        data: null,
      });
    }
    return res.status(500).json({
      status: 0,
      message: "Internal server error",
      data: null,
      error: error.message,
    });
  }
};
