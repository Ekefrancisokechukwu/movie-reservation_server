import { Request, Response } from "express";
import { getUsers } from "../model/UserModal";

const getAllUsers = async (req: Request, res: Response) => {
  const data = await getUsers();
  res.status(200).json({ data });
};

export { getAllUsers };
