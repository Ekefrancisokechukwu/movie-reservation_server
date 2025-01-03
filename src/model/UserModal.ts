import { queryDB } from "../config/db";

interface IUserProps {
  googleId: string;
  fullname: string;
  email: string;
  role: "admin" | "customer";
  profileImg: string;
}

const createUser = async ({
  googleId,
  fullname,
  email,
  role,
  profileImg,
}: IUserProps) => {
  const query = `INSERT INTO users (google_id,fullname, email, role, profileImg)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;

  const params = [googleId, fullname, email, role, profileImg];
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
