import dotenv from "dotenv";
import cors from "cors";
import "express-async-errors";
import express from "express";
const session = require("express-session");
const passport = require("./config/passport");
dotenv.config();
// middleware
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorHandlerMiddleware from "./middleware/errorMiddleware.js";
// Routes
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
// basic setup
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
// session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1D
    },
}));
// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.get("/", (req, res) => {
    res.send(`
     <div style="width:30rem;margin:0 auto">
     <h1>Movie Reserving ticket  API</h1>
     <a href="/api/v1/auth/google">Login</a>
     </div>
    `);
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
export default app;
