import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.Interface";
import { USER_ROLE } from "./user.constant";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password Must be at least 8 Characters"],
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: Object.keys(USER_ROLE),
  },
  address: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});
userSchema.post("save", function (doc, next) {
  doc.password = "";

  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email: email });
};

userSchema.statics.isUserExistsByid = async function (id: string) {
  return await User.findById(id);
};

userSchema.statics.isUserExistsByNumber = async function (phone: string) {
  return await User.findOne({ phone });
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
export const User = model<TUser, UserModel>("User", userSchema);
