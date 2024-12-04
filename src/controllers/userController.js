const { getUsers } = require("../model/UserModal");

const getAllUsers = async (req, res) => {
  const data = await getUsers();

  res.status(200).json({ data });
};

module.exports = { getAllUsers };
