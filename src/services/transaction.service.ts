import pool from "../database/db";
import { TransactionType } from "../dtos/transaction/transactionType";
import { findServiceByCode } from "../repositories/service.repository";
import {
  createTransaction,
  findTransactionHistory,
} from "../repositories/transaction.repository";
import {
  findUserById,
  getUserBalance,
  updateUserBalance,
} from "../repositories/user.repository";
import { decodeToken } from "../utils/jwt";

export const getCurrentBalance = async (token: string) => {
  const userId = decodeToken(token);

  const user = await findUserById(userId);

  if (!user) {
    throw new Error("Token tidak tidak valid atau kadaluwarsa");
  }

  const balance = await getUserBalance(userId);

  return balance;
};

export const topUpBalance = async (userId: number, amount: number) => {
  if (amount <= 0) {
    throw new Error(
      "Parameter top_up_amount hanya boleh angka dan tidak boleh lebih kecil dari 0"
    );
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new Error("Token tidak tidak valid atau kadaluwarsa");
  }

  const newBalance = user.balance + amount;

  await updateUserBalance(user.id, newBalance);

  await createTransaction({
    userId: user.id,
    transaction_type: TransactionType.TOPUP,
    total_amount: amount,
    description: "Top Up balance",
  });

  return newBalance;
};

export const serviceTransaction = async (
  userId: number,
  service_code: string
) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("Token tidak tidak valid atau kadaluwarsa");
  }

  const service = await findServiceByCode(service_code);

  if (!service) {
    throw new Error("Service ataus Layanan tidak ditemukan");
  }

  if (user.balance < service.service_tariff) {
    throw new Error("Saldo tidak mencukupi");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const deductedBalance = user.balance - service.service_tariff;

    await updateUserBalance(userId, deductedBalance);

    const transaction = await createTransaction({
      userId,
      transaction_type: TransactionType.PAYMENT,
      total_amount: service.service_tariff,
      description: service.service_name,
    });

    await client.query("BEGIN");

    return { transaction, service };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getUserTransactionHistory = async (
  userId: number,
  offset: number,
  limit: number
) => {
  return await findTransactionHistory(userId, offset, limit);
};
