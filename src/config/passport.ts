import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  StrategyOptions,
  VerifyCallback,
} from "passport-google-oauth20";
import { createUser, findUserWithId } from "../model/UserModal";
import { queryDB } from "./db";
import { IUser } from "../type";

const config = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
};

const AUTH_OPTIONS: StrategyOptions = {
  clientID: config.CLIENT_ID as string,
  clientSecret: config.CLIENT_SECRET as string,
  callbackURL: config.CALLBACK_URL,
};

async function verifyCallback(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
): Promise<void> {
  const { id: google_id, displayName: name } = profile;
  const profilePicture = profile.photos?.[0]?.value || "";
  const email = profile.emails?.[0]?.value || "";

  try {
    let user = await findUserWithId(google_id);
    const role = "customer";

    if (!user) {
      user = await createUser({
        google_id,
        full_name: name,
        email,
        role,
        profile_img: profilePicture,
      });
    }

    const userForPassport: IUser = {
      _id: user.id.toString(),
      google_id: user.googleId,
      name: user.fullname,
      email: user.email,
      profilePicture: user.profileImg,
    };

    done(null, userForPassport);
  } catch (error) {
    done(error as Error);
  }
}

passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, (user as IUser).google_id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const result = await queryDB(`SELECT * FROM users WHERE google_id = $1`, [
      id,
    ]);
    const user = result.rows[0] as IUser;
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
