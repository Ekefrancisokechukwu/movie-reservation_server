import { getUsers } from "../model/UserModal.js";
const getAllUsers = async (req, res) => {
    const data = await getUsers();
    res.status(200).json({ data });
};
export { getAllUsers };
