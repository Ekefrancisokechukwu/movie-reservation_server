import { Request, Response } from "express";
import { IUser } from "../type";
import { generateToken } from "../utils/jwt";

function googleCallback(req: Request, res: Response) {
  const user = req.user as IUser;

  const token = generateToken({
    googleId: user.google_id,
    _id: JSON.stringify(user._id),
  });

  // console.log(token);

  res.redirect("/");
}

function logout(req: Request, res: Response) {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.redirect("/");
  });
}

export { logout, googleCallback };
