import mongoose from "mongoose";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createFacilityService = async (payload: TFacility) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const facility = await Facility.findOne({ name: payload?.name }).session(
      session
    );
    if (facility) {
      throw new AppError(httpStatus.NOT_FOUND, "facility is already Exists!!");
    }
    const result = await Facility.create([payload], { session });

    await session.commitTransaction();
    await session.endSession();
    return result[0];
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message);
  }
};

export const FacilityServices = {
  createFacilityService,
};
