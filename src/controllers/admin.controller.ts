import { Request, Response } from "express";
import {
  getAll,
  create,
  update,
  getAllActive,
  login,
  deleteUser,
} from "../services/admin.service";

export class AdminController {
  async getAll(req: Request, res: Response) {
    const { status, message, data } = await getAll();

    return res.status(status).json({
      message,
      data,
    });
  }

  async create(req: Request, res: Response) {
    const { status, message, data } = await create(req.body);

    return res.status(status).json({
      message,
      data,
    });
  }

  async login(req: Request, res: Response) {
    const { status, message, data } = await login(req.body);
    if (status === 200 && data?.token) {
      res.cookie("access_token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      });
    }
    return res.status(status).json({
      message,
      data,
    });
  }

  async logout(req: Request, res: Response) {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Logout Successful" });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const { status, message, data } = await update(
      parseInt(id) as number,
      req.body
    );

    return res.status(status).json({
      message,
      data,
    });
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    const { status, message } = await deleteUser(parseInt(id) as number);

    return res.status(status).json({
      message,
    });
  }

  async getAllActive(req: Request, res: Response) {
    const { status, message, data } = await getAllActive();

    return res.status(status).json({
      message,
      data,
    });
  }
}
