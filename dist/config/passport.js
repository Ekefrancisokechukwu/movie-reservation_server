const passport = require("passport");
import { Strategy as GoogleStrategy, } from "passport-google-oauth20";
import { createUser, findUserWithId } from "../model/UserModal";
import { queryDB } from "./db";
const config = {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
};
const AUTH_OPTIONS = {
    clientID: config.CLIENT_ID || "",
    clientSecret: config.CLIENT_SECRET || "",
    callbackURL: config.CALLBACK_URL,
};
async function verifyCallback(accessToken, refreshToken, profile, done) {
    const { id: googleId, displayName: fullname } = profile;
    const profileImg = profile.photos?.[0]?.value || "";
    const email = profile.emails?.[0]?.value || "";
    let user = await findUserWithId(googleId);
    const role = "customer";
    if (!user) {
        user = await createUser({
            googleId,
            fullname,
            email,
            role,
            profileImg,
        });
    }
    done(null, user);
}
passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallback));
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const result = await queryDB(`SELECT * FROM users WHERE id = $1`, [id]);
        const user = result.rows[0];
        done(null, user || null);
    }
    catch (err) {
        done(err, null);
    }
});
module.exports = passport;
