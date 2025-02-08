import { Request, Response } from "express";
import { validateUpdateProfileBody } from "../../validations/auth/updateProfile.validation";
import { UpdateProfileDto } from "../../dtos/auth/updateProfileDto";
import { updateProfileService } from "../../services/auth.service";

export const updateProfile = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: 108,
      message: "Token tidak tidak valid atau kadaluwarsa",
      data: null,
    });
  }

  const { error } = validateUpdateProfileBody(req.body);

  if (error) {
    return res.status(400).json({
      status: 102,
      message: error.details[0].message,
      data: null,
    });
  }

  const { first_name, last_name }: UpdateProfileDto = req.body;

  try {
    const updatedProfile = await updateProfileService(
      token,
      first_name,
      last_name
    );

    return res.status(200).json({
      status: 0,
      message: "Update Profile berhasil",
      data: updatedProfile,
    });
  } catch (error: any) {
    if (error.message === "Token tidak tidak valid atau kadaluwarsa") {
      return res.status(401).json({
        status: 108,
        message: error.message,
        data: null,
      });
    }
    return res.status(401).json({
      status: 108,
      message: error.message,
      data: null,
    });
  }
};
