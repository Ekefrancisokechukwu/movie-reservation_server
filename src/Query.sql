

-- USER TABLE
CREATE TABLE users (
  Id SERIAL PRIMARY KEY,
  googleId VARCHAR(255) UNIQUE,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  role  VARCHAR(20) NOT NULL DEFAULT 'customer' CHECK (role IN ('admin','customer')),
  profileImg TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);


-- MOVIE TABLE

CREATE TABLE movies (
  Id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  posterImg VARCHAR(255),
  description VARCHAR(255),
  genre VARCHAR(255)
  showtime TIMESTAMP
)
