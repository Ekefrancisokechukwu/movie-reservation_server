CREATE TABLE users (
  Id SERIAL PRIMARY KEY,
  google_id VARCHAR(255) UNIQUE,
  fullname VARCHAR(255) NOT NULL,
  email  UNIQUE NOT NULL,
  role  VARCHAR(20) NOT NULL DEFAULT 'customer' CHECK (role IN ('admin','customer')),
  profileImg TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
)

