

-- USER TABLE
CREATE TABLE users (
  Id SERIAL PRIMARY KEY,
  google_id VARCHAR(255) UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  role  VARCHAR(20) NOT NULL DEFAULT 'customer' CHECK (role IN ('admin','customer')),
  profile_img TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);


-- MOVIE TABLE
CREATE TABLE movies (
  Id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  poster_img TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)

-- MOVIE GENERS
CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);


-- MOVIE GENERS
CREATE TABLE movie_genres (
  id SERIAL PRIMARY KEY,
  movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
  genre_id INT REFERENCES genres(id) ON DELETE CASCADE,
  UNIQUE (movie_id, genre_id)
);

-- SHOWTIMES
CREATE TABLE showtimes (
  id SERIAL PRIMARY KEY,
  movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
  showtime TIMESTAMP NOT NULL,
  capacity INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);