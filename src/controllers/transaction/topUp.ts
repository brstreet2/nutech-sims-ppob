import { Request, Response } from "express";
import { validateTopUpBody } from "../../validations/transaction/topup.validation";
import { topUpBalance } from "../../services/transaction.service";
import { decodeToken } from "../../utils/jwt";

export const topUp = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: 108,
      message: "Token tidak tidak valid atau kadaluwarsa",
      data: null,
    });
  }

  const { error } = validateTopUpBody(req.body);

  if (error) {
    return res.status(400).json({
      status: 102,
      message: error.details[0].message,
      data: null,
    });
  }

  const { top_up_amount } = req.body;

  try {
    const userId = decodeToken(token);
    const balance = await topUpBalance(userId, top_up_amount);

    return res.status(200).json({
      status: 0,
      message: "Top Up Balance berhasil",
      data: { balance: balance },
    });
  } catch (error: any) {
    if (
      error.message ===
      "Parameter top_up_amount hanya boleh angka dan tidak boleh lebih kecil dari 0"
    ) {
      return res.status(400).json({
        status: 102,
        message:
          "Parameter top_up_amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
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
