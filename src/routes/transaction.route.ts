import express from "express";
import { topUp } from "../controllers/transaction/topUp";
import { getBalance } from "../controllers/transaction/getBalance";
import { processTransaction } from "../controllers/transaction/processTransaction";
import { getTransactionHistory } from "../controllers/transaction/getTransactionHistory";

const router = express.Router();

router.get("/balance", getBalance);
router.post("/topup", topUp);
router.post("/transaction", processTransaction);
router.get("/transaction/history", getTransactionHistory);

export default router;
