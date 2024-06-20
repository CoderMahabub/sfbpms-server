/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TUser } from "../User/user.Interface";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import config from "../../config";
import { createToken } from "./auth.utils";

const signupService = async (payload: TUser): Promise<any> => {
  //user existence check
  const user = await User.isUserExistsByEmail(payload?.email);

  if (user) {
    throw new Error("User already exists");
  }

  const userPhone = await User.isUserExistsByNumber(payload?.phone);
  if (userPhone) {
    throw new Error("User Number already exists!");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //create user
    const newUser = await User.create([payload], { session });
    // console.log("newUser", newUser);
    await session.commitTransaction();
    await session.endSession();
    return newUser[0];
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const loginService = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    "+password"
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!!");
  }
  // // checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched !!");
  }

  const userData = await User.isUserExistsByEmail(payload?.email);

  const jwtPayload = {
    email: user?.email ?? "",
    role: user?.role ?? "",
    userId: user?._id ?? "",
  };
  // create access token and send client
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  // create refresh token and send client
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    userData,
  };
};

export const AuthServices = {
  signupService,
  loginService,
};
