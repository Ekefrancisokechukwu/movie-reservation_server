import { Request, Response } from "express";
import { queryDB } from "../config/db";
import BadRequestError from "../errors/badRequestError";

export const addMovie = async (req: Request, res: Response) => {
  // const { title, description, posterImg, genres, showtimes } = req.body;

  // if (
  //   !title ||
  //   !description ||
  //   !posterImg ||
  //   !genres ||
  //   !Array.isArray(genres) ||
  //   !showtimes ||
  //   !Array.isArray(showtimes)
  // ) {
  //   throw new BadRequestError("Invalid input");
  // }

  // const query = `INSERT INTO users (title,description, poster_img)
  // VALUES ($1, $2, $3)
  // RETURNING *;
  // `;

  // const movie = await queryDB(query, [title, description, posterImg]);

  res.status(201).json({ movie: "Jong" });
};

export const getAllMovies = async (req: Request, res: Response) => {
  res.status(200).json("getAllMovies");
};

export const updateMovie = async (req: Request, res: Response) => {
  res.status(200).json("updated");
};

export const deleteMovie = async (req: Request, res: Response) => {
  res.status(200).json("deleted");
};
