import { queryDB } from "../config/db";

interface IUserProps {
  google_id: string;
  full_name: string;
  email: string;
  role: "admin" | "customer";
  profile_img: string;
}

const createUser = async ({
  google_id,
  full_name,
  email,
  role,
  profile_img,
}: IUserProps) => {
  const query = `INSERT INTO users (google_id,full_name, email, role, profile_img)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;

  const params = [google_id, full_name, email, role, profile_img];
  const res = await queryDB(query, params);

  return res.rows[0];
};

const getUsers = async () => {
  const query = `SELECT * FROM users`;
  const res = await queryDB(query, []);

  return res.rows;
};

const findUserByEmail = async (email: string) => {
  const query = `SELECT * FROM users 
  WHERE email = $1
  `;
  const res = await queryDB(query, [email]);
  return res.rows[0];
};

const findUserWithId = async (id: string) => {
  const query = `SELECT * FROM users 
  WHERE google_id = $1
  `;

  const res = await queryDB(query, [id]);
  return res.rows[0];
};

export { createUser, findUserByEmail, findUserWithId, getUsers };
