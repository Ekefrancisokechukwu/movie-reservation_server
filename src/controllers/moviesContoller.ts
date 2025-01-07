import { Request, Response } from "express";
import { queryDB } from "../config/db";
import BadRequestError from "../errors/badRequestError";

export const addMovie = async (req: Request, res: Response) => {
  const { title, description, posterImg, genres, showtimes } = req.body;

  if (
    !title ||
    !description ||
    !posterImg ||
    !genres ||
    !Array.isArray(genres) ||
    !showtimes ||
    !Array.isArray(showtimes)
  ) {
    throw new BadRequestError("Invalid input");
  }

  // Insert movie
  const query = `INSERT INTO movies (title,description, poster_img)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

  const movieResult = await queryDB(query, [title, description, posterImg]);
  const movie = movieResult.rows[0];

  // Insert genres and link to movie
  for (const genre of genres) {
    const genreResult = await queryDB(
      `INSERT INTO genres (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id`,
      [genre]
    );
    const genreId =
      genreResult.rows[0]?.id ||
      (await queryDB(`SELECT id FROM genres WHERE name = $1`, [genre])).rows[0]
        .id;

    await queryDB(
      `INSERT INTO movie_genres (movie_id, genre_id) VALUES ($1, $2)`,
      [movie.id, genreId]
    );
  }

  // Insert showtimes
  for (const showtime of showtimes) {
    const { showtime: showTimstamp, capacity } = showtime;
    await queryDB(
      `INSERT INTO showtimes (movie_id, showtime, capacity) VALUES ($1, $2, $3)`,
      [movie.id, showTimstamp, capacity]
    );
  }

  res.status(201).json({ movie });
};

export const getAllMovies = async (req: Request, res: Response) => {
  // Querys to fetch movies with genres and showtimes
  const query = `SELECT m.id AS movie_id,
   m.title,
    m.description,
     m.poster_img,
      ARRAY_AGG(g.name) AS genres,
      JSON_AGG(
          JSON_BUILD_OBJECT(
            'showtime', s.showtime,
            'capacity', s.capacity
          )
        ) AS showtimes
         FROM movies m
         LEFT JOIN
         movie_genres mg ON m.id = mg.movie_id
         LEFT JOIN
         genres g ON mg.genre_id = g.id
         LEFT JOIN
         showtimes s ON m.id = s.movie_id
         GROUP BY m.id
        `;

  const movies = await queryDB(query, []);

  res.status(200).json({ length: movies.rowCount, movies: movies.rows });
};

export const updateMovie = async (req: Request, res: Response) => {
  res.status(200).json("updated");
};

export const deleteMovie = async (req: Request, res: Response) => {
  res.status(200).json("deleted");
};
