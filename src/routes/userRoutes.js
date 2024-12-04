const { Router } = require("express");
const { getAllUsers } = require("../controllers/userController");
const router = Router();

router.route("/").get(getAllUsers);

module.exports = router;
