import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserProfile,
  updateUserProfileImage,
  updateUserToken,
} from "../repositories/user.repository";
import { RegisterUserDto } from "../dtos/auth/registerDto";
import { LoginUserDto } from "../dtos/auth/loginDto";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { decodeToken, generateToken } from "../utils/jwt";
import fs from "fs";
import path from "path";

export const registerUser = async (user: RegisterUserDto) => {
  const existingUser = await findUserByEmail(user.email);
  if (existingUser) {
    throw new Error("Email sudah terdaftar");
  }

  return createUser(user);
};

export const loginUser = async (data: LoginUserDto) => {
  const user = await findUserByEmail(data.email);
  if (!user) {
    throw new Error("Username atau password salah");
  }

  const isValidPassword = await bcrypt.compare(data.password, user.password);

  if (!isValidPassword) {
    throw new Error("Username atau password salah");
  }

  // Generate token
  const jti = uuidV4();
  const { accessToken } = generateToken(user.id, jti);

  await updateUserToken(user.id, accessToken.token);

  return {
    accessToken,
  };
};

export const getUserProfile = async (token: string) => {
  try {
    const userId = decodeToken(token);

    const user = await findUserById(userId);

    if (!user) {
      throw new Error("Token tidak tidak valid atau kadaluwarsa");
    }

    return {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_image: user.profile_image,
    };
  } catch (error) {
    throw new Error("Token tidak tidak valid atau kadaluwarsa");
  }
};

export const updateProfileService = async (
  token: string,
  firstName: string,
  lastName: string
) => {
  try {
    const userId = decodeToken(token);

    const updatedUser = await updateUserProfile(userId, firstName, lastName);

    if (!updatedUser) {
      throw new Error("Token tidak tidak valid atau kadaluwarsa");
    }

    return {
      email: updatedUser.email,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      profile_image: updatedUser.profile_image,
    };
  } catch (error) {
    throw new Error("Token tidak tidak valid atau kadaluwarsa");
  }
};

export const uploadProfileImage = async (
  token: string,
  file: Express.Multer.File
) => {
  const userId = decodeToken(token);

  if (!userId) {
    throw new Error("Token tidak tidak valid atau kadaluwarsa");
  }

  const VALID_EXT = ["image/jpeg", "image/png", "image/gif"];

  if (!VALID_EXT.includes(file.mimetype)) {
    throw new Error("Format Image tidak sesuai");
  }

  try {
    const uploadDir = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.originalname);

    fs.writeFileSync(filePath, file.buffer);

    const fileUrl = `${process.env.APP_URL}/uploads/${file.originalname}`;

    const updateUserData = await updateUserProfileImage(userId, fileUrl);

    if (!updateUserData) {
      throw new Error("Token tidak tidak valid atau kadaluwarsa");
    }

    return {
      email: updateUserData.email,
      first_name: updateUserData.first_name,
      last_name: updateUserData.last_name,
      profile_image: updateUserData.profile_image,
    };
  } catch (error: any) {
    throw new Error("Token tidak tidak valid atau kadaluwarsa");
  }
};
