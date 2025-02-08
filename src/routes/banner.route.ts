import express from "express";
import { getBanners } from "../controllers/banner/getBanners";

const router = express.Router();

router.get("/banner", getBanners);

export default router;
