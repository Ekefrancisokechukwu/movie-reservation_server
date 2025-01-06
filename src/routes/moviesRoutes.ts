import { Router } from "express";
import {
  addMovie,
  deleteMovie,
  getAllMovies,
  updateMovie,
} from "../controllers/moviesContoller";

const router = Router();

router.route("/").post(addMovie).get(getAllMovies);
router.route("/:id").patch(updateMovie).delete(deleteMovie);
