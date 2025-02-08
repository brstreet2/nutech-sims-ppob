import { Request, Response } from "express";
import { getUserTransactionHistory } from "../../services/transaction.service";
import { decodeToken } from "../../utils/jwt";

export const getTransactionHistory = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: 108,
      message: "Token tidak tidak valid atau kadaluwarsa",
      data: null,
    });
  }

  const userId = decodeToken(token);

  if (!userId) {
    return res.status(401).json({
      status: 108,
      message: "Token tidak tidak valid atau kadaluwarsa",
      data: null,
    });
  }

  const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

  try {
    const history = await getUserTransactionHistory(userId, offset, limit);

    res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      data: {
        offset,
        limit,
        records: history,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: 1,
      message: error.message || "Gagal mengambil riwayat transaksi",
    });
  }
};
