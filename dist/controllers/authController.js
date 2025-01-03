import { generateToken } from "../utils/jwt.js";
function googleCallback(req, res) {
    const user = req.user;
    const token = generateToken({
        googleId: user.googleId,
        _id: JSON.stringify(user._id),
    });
    console.log(token);
    res.redirect("/");
}
function logout(req, res) {
    req.logout((err) => {
        if (err)
            return res.status(500).json({ message: "Logout failed" });
        res.redirect("/");
    });
}
export { logout, googleCallback };
