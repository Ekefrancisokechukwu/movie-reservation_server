import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";
const router = Router();
router.route("/").get(getAllUsers);
export default router;
