import pool from "../database/db";
import { CreateTransactionDto } from "../dtos/transaction/createTransactionDto";

export const createTransaction = async (data: CreateTransactionDto) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const invoiceNumber = `INV${timestamp}`;
  const result = await pool.query(
    `INSERT INTO transactions (invoice_number, user_id, transaction_type, description, total_amount, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *`,
    [
      invoiceNumber,
      data.userId,
      data.transaction_type,
      data.description,
      data.total_amount,
    ]
  );

  return result.rows[0];
};

export const findTransactionHistory = async (
  userId: number,
  offset: number,
  limit: number
) => {
  const result = await pool.query(
    `SELECT invoice_number, transaction_type, description, total_amount, created_at AS created_on FROM transactions WHERE user_id = $1 ORDER BY created_at DESC OFFSET $2 LIMIT $3`,
    [userId, offset, limit]
  );

  return result.rows;
};
