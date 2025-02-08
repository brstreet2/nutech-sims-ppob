import { Request, Response } from "express";
import { getAllServices } from "../../services/services.service";

export const getServices = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: 108,
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null,
      });
    }

    const services = await getAllServices();

    return res.status(200).json({
      status: 0,
      message: "Sukses",
      data: services,
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
