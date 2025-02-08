import { Request, Response } from "express";
import { uploadProfileImage } from "../../services/auth.service";

export const updateProfileImage = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: 108,
      message: "Token tidak tidak valid atau kadaluwarsa",
      data: null,
    });
  }

  if (!req.file) {
    return res.status(400).json({
      status: 102,
      message: "Field file tidak boleh kosong",
      data: null,
    });
  }

  try {
    const result = await uploadProfileImage(token, req.file);
    return res.status(200).json({
      status: 0,
      message: "Update Profile Image berhasil",
      data: result,
    });
  } catch (error: any) {
    if (error.message === "Format Image tidak sesuai") {
      return res.status(400).json({
        status: 102,
        message: "Format Image tidak sesuai",
        data: null,
      });
    }

    if (error.message === "Token tidak tidak valid atau kadaluwarsa") {
      return res.status(401).json({
        status: 108,
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null,
      });
    }
    return res.status(401).json({
      status: 108,
      message: "Token tidak tidak valid atau kadaluwarsa",
      data: null,
    });
  }
};
