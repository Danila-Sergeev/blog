import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((userInformation) => {
      res.send({
        token: jwt.sign({ _id: userInformation._id }, "super-strong-secret", {
          expiresIn: "7d",
        }),
      });
    })
    .catch(next);
};
