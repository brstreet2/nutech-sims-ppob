import dotenv from "dotenv";
import express, { Request, Response } from "express";
import authRoutes from "./routes/auth.route";
import bannerRoutes from "./routes/banner.route";
import serviceRoutes from "./routes/services.route";
import transactionRoutes from "./routes/transaction.route";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.json({ limit: "11mb" }));
app.use(express.urlencoded({ limit: "11mb", extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "OK" });
});
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "API is running." });
});
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));
// Routes
app.use(authRoutes);
app.use(bannerRoutes);
app.use(serviceRoutes);
app.use(transactionRoutes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
