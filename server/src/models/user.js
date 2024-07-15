import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.static(
  "findUserByCredentials",
  function findUserByCredentials(email, password) {
    return this.findOne({ email }).then((user) => {
      if (!user) {
        return Promise.reject(cosole.log("err"));
      }
      return bcrypt.compare(password, user.passwordHash).then((matched) => {
        if (!matched) {
          return Promise.reject(cosole.log("err"));
        }
        return user;
      });
    });
  }
);

export default mongoose.model("User", UserSchema);
