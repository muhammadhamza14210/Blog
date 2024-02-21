import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json("Signed up successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email ||!password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "Invalid username or password"));
    }

    const isMatch = bcryptjs.compareSync(password, user.password);

    if (!isMatch) {
      return next(errorHandler(400, "Invalid username or password"));
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const {password:pass, ...rest} = user._doc;
    res.status(200).cookie('access_token', token,{
      httpOnly: true}).json(rest);
    next();
  } catch (error) {
    next(error);
  }
}
