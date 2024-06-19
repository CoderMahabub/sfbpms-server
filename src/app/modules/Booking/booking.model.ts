import { Schema, model } from "mongoose";
import { BOOKING_STATUS } from "./booking.constant";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    facility: {
      type: Schema.Types.ObjectId,
      ref: "Facility",
      required: [true, "Facility is required"],
    },
    payableAmount: {
      type: Number,
      required: false,
    },
    isBooked: {
      type: String,
      required: true,
      enum: Object.keys(BOOKING_STATUS),
      default: BOOKING_STATUS.unconfirmed,
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = model<TBooking>("Booking", bookingSchema);
