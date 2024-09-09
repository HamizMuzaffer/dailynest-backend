import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user exists in your database
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If user doesn't exist, create a new one
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          });

          await user.save();
        }

        // Create JWT token for the user
        const token = jwt.sign(
          { userId: user._id, email: user.email, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        // Pass the token as the `done` callback result
        return done(null, { token });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Serialize user for session handling (optional if you're using sessions)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
