import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const createToken = (
  jwtPayload: { email: string; role: string; userId: Types.ObjectId },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

type TLoginResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token: string;
  data: T;
};

export const sendLoginResponse = <T>(
  res: Response,
  data: TLoginResponse<T>,
) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    token: data.token,
    data: data.data,
  });
};
