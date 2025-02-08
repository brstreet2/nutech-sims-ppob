import express from "express";
import { getServices } from "../controllers/service/getServices";

const router = express.Router();

router.get("/services", getServices);

export default router;
