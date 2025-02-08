import bcrypt from "bcrypt";
import pool from "../database/db";
import { RegisterUserDto } from "../dtos/auth/registerDto";

export const createUser = async (user: RegisterUserDto) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const result = await pool.query(
    "INSERT INTO users (email, password, first_name, last_name, balance, created_at, updated_at) VALUES ($1, $2, $3, $4, 0, NOW(), NOW()) RETURNING id, email, first_name, last_name, created_at, updated_at",
    [user.email, hashedPassword, user.first_name, user.last_name]
  );
  return result.rows[0];
};

export const findUserById = async (id: number) => {
  const result = await pool.query(
    "SELECT id, email, first_name, last_name, profile_image, balance FROM users WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return result.rows[0];
};

export const updateUserToken = async (userId: number, token: string) => {
  const result = await pool.query(
    "UPDATE users SET access_token = $1, updated_at = NOW() WHERE id = $2 RETURNING id, email, first_name, last_name, access_token",
    [token, userId]
  );

  return result.rows[0];
};

export const updateUserProfile = async (
  userId: number,
  firstName: string,
  lastName: string
) => {
  const result = await pool.query(
    "UPDATE users SET first_name = $1, last_name = $2, updated_at = NOW() WHERE id = $3 RETURNING email, first_name, last_name, profile_image",
    [firstName, lastName, userId]
  );

  return result.rows[0];
};

export const updateUserProfileImage = async (
  userId: number,
  imageUrl: string
) => {
  const result = await pool.query(
    "UPDATE users SET profile_image = $1, updated_at = NOW() WHERE id = $2 RETURNING email, first_name, last_name, profile_image",
    [imageUrl, userId]
  );

  return result.rows[0];
};

export const updateUserBalance = async (userId: number, amount: number) => {
  const result = await pool.query(
    `UPDATE users SET balance = $1, updated_at = NOW() WHERE id = $2 RETURNING balance`,
    [amount, userId]
  );

  return result.rows[0];
};

export const getUserBalance = async (userId: number) => {
  const result = await pool.query(`SELECT balance FROM users WHERE id = $1`, [
    userId,
  ]);

  return result.rows[0];
};
