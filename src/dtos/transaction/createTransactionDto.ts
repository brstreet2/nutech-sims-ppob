import { TransactionType } from "./transactionType";

export interface CreateTransactionDto {
  userId: number;
  transaction_type: TransactionType;
  description: string;
  total_amount: number;
}
