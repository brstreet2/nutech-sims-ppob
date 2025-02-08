import { Request, Response } from "express";
import { getCurrentBalance } from "../../services/transaction.service";

export const getBalance = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: 108,
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null,
      });
    }

    const balance = await getCurrentBalance(token);

    return res.status(200).json({
      status: 0,
      message: "Get Balance Berhasil",
      data: balance,
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
