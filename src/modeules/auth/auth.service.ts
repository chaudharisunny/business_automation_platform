import bcrypt from "bcrypt";

import * as authRepo from "./auth.repository";
import { generateToken } from "../../middleware/auth.middleware";

export const registerUser = async (
  payload: {
    name: string;
    email: string;
    password: string;
  }
) => {

  console.log("Payload:", payload);

  if (!payload.password) {
    throw new Error("Password is required");
  }

  const existingUser =
    await authRepo.findUserEmail(payload.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword =
    await bcrypt.hash(payload.password, 10);

  const user =
    await authRepo.createUser(
      payload.name,
      payload.email,
      hashedPassword
    );

  return user;
};

export const loginUser = async (
  email: string,
  password: string
) => {

  const user =
    await authRepo.findUserEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const { token } = generateToken(user);
  return { token };
};

export const logout = async () => {
  return {
    success: true,
    message: "Logged out successfully",
  };
};