import { Request, Response } from "express";
import { getAllBanners } from "../../services/banner.service";

export const getBanners = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: 108,
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null,
      });
    }

    const banners = await getAllBanners();

    return res.status(200).json({
      status: 0,
      message: "Sukses",
      data: banners,
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
