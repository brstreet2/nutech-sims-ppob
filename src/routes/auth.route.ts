import express from "express";
import { register } from "../controllers/auth/register";
import { login } from "../controllers/auth/login";
import { profile } from "../controllers/auth/profile";
import { updateProfile } from "../controllers/auth/updateProfile";
import { updateProfileImage } from "../controllers/auth/updateProfileImage";
import multer from "multer";

const router = express.Router();

const upload = multer();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);
router.put("/profile/update", updateProfile);
router.put("/profile/image", upload.single("file"), updateProfileImage);

export default router;
