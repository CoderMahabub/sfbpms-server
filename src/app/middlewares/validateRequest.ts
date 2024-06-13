import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //validation(if everything alright next()-->)
      await schema.parseAsync({
        body: req.body,
      });
    } catch (err) {
      next(err);
    }

    next();
  };
};
export default validateRequest;
