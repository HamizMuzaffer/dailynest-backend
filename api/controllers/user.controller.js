import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// API for creating users 

export async function createUser(req, res) {
  try {
    // checking if user has provided all the credentials

    const { email, password, username } = req.body;

    if (!username || !password || !email) {
      return res
        .status(401)
        .json({ error: "User must provide all credential" });
    }

    // If user exists with similar email
    const existedEmail = await User.findOne({ email });

    if (existedEmail) {
      return res.status(401).json({ error: "User already exists" });
    }

    // If user exists with similar username
    const existedUsername = await User.findOne({ username });

    if (existedUsername) {
      return res.status(401).json({ error: "Username must be unique" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email,
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({ message: "user created sucessfully" });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ error: error.message });
  }
}


// API logging in feature 

export async function loginUser(req, res) {
    try {
      // Destructure the user data from request body
      const { email, username, password } = req.body;
  
      // Checking if at least email/username and password are provided
      if ((!email && !username) || !password) {
        return res.status(400).json({ error: "Email/Username and Password are required" });
      }
  
      // Find the user by email or username
      let user;
      if (email) {
        user = await User.findOne({ email });
      } else if (username) {
        user = await User.findOne({ username });
      }
  
      // If user does not exist
      if (!user) {
        return res.status(401).json({ error: "Invalid email/username or password" });
      }
  
      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email/username or password" });
      }
  
      // Generating a JWT token
      
      const token = jwt.sign(
        { userId: user._id, email: user.email, username: user.username },
        process.env.JWT_SECRET, 
        { expiresIn: "1h" }     
      );
  
      
      res.status(200).json({
        message: "Login successful",
        token
      });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
