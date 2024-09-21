import express from "express";
import passport from "passport";

const router = express.Router();

// Route to initiate Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    // Successful authentication
    const token = req.user.token;

    // Redirect user or respond with token
    res.status(200).json({
      message: "Login successful",
      token,
    });
  }
);

export default router;
