const { generateToken } = require("../../utils/jwt");

function googleCallback(req, res) {
  const user = req.user;

  const token = generateToken({
    googleId: user.googleId,
    id: JSON.stringify(user._id),
  });

  console.log(token);

  res.redirect("/");
}

function logout(req, res) {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.redirect("/");
  });
}

module.exports = { logout, googleCallback };
