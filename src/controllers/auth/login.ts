import { Request, Response } from "express";
import { validateLoginBody } from "../../validations/auth/login.validation";
import { LoginUserDto } from "../../dtos/auth/loginDto";
import { loginUser } from "../../services/auth.service";

export const login = async (req: Request, res: Response) => {
  const { error } = validateLoginBody(req.body);

  if (error) {
    return res.status(400).json({
      status: 102,
      message: error.details[0].message,
      data: null,
    });
  }

  const { email, password }: LoginUserDto = req.body;

  try {
    const result = await loginUser({ email, password });

    return res.status(200).json({
      status: 0,
      message: "Login Sukses",
      data: result.accessToken,
    });
  } catch (error: any) {
    if (error.message === "Username atau password salah") {
      return res.status(401).json({
        status: 103,
        message: "Username atau password salah",
        data: null,
      });
    }
  }
};
