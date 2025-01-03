import jwt from "jsonwebtoken";
function generateToken({ googleId, _id }) {
    const token = jwt.sign({ googleId, _id }, process.env.JWT_SECRET || "", {
        expiresIn: "1d",
    });
    return token;
}
function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET || "");
}
const attachCookiesToResponse = (res, user) => {
    const token = generateToken(user);
    const oneDay = 1000 * 60 * 60 * 25;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
        signed: true,
    });
    return token;
};
export { verifyToken, generateToken, attachCookiesToResponse };
