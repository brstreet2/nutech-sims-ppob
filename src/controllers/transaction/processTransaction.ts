import { Request, Response } from "express";
import { decodeToken } from "../../utils/jwt";
import { serviceTransaction } from "../../services/transaction.service";

export const processTransaction = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: 108,
      message: "Token tidak tidak valid atau kadaluwarsa",
      data: null,
    });
  }

  const { service_code } = req.body;

  try {
    const userId = decodeToken(token);
    const transaction = await serviceTransaction(userId, service_code);

    return res.status(200).json({
      status: 0,
      message: "Transaksi berhasil",
      data: {
        invoice_number: transaction.transaction.invoice_number,
        service_code: transaction.service.service_code,
        service_name: transaction.service.service_name,
        transaction_type: transaction.transaction.transaction_type,
        total_amount: transaction.service.service_tariff,
        created_on: transaction.transaction.created_at,
      },
    });
  } catch (error: any) {
    if (error.message === "Saldo tidak mencukupi") {
      return res.status(400).json({
        status: 102,
        message: "Saldo tidak mencukupi",
        data: null,
      });
    }

    if (error.message === "Service ataus Layanan tidak ditemukan") {
      return res.status(400).json({
        status: 102,
        message: "Service ataus Layanan tidak ditemukan",
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
