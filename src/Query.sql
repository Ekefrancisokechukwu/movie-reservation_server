

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
  posterImg TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
)


