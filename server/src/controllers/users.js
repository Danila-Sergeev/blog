import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (error) {
    return res.send(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { email, password, fullName, avatarUrl } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      email,
      passwordHash: hash,
      avatarUrl,
    });
    return res.send(newUser);
  } catch (error) {
    return res.send(error);
  }
};
