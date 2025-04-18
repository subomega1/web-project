import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    console.log(`${name} ${email} ${password} ${confirmPassword}`);
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      await newUser.save();
      res.status(201).json({
        message: "User created successfully",
        user: {
          name: newUser.name,
          email: newUser.email,
        },
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("could not create user", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    await generateToken(user._id, res);

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logout successful" });
};
