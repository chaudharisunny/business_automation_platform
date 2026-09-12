import { Request, Response } from "express";
import * as authService from "./auth.service";

export const register = async (
  req: Request,
  res: Response
) => {
  try {

    console.log("Request Body:", req.body);

    const result = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });

  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {

    const result = await authService.loginUser(
      req.body.email,
      req.body.password
    );

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });

  }
};

export const logout = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await authService.logout();

  res.status(200).json(result);
};