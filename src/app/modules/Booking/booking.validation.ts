import { z } from "zod";
import { BOOKING_STATUS } from "./booking.constant";

const timeStringSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Must be HH:MM");

export const createBookingSchema = z.object({
  body: z
    .object({
      date: z.string().refine(
        (val) => {
          // Check if date is in valid YYYY-MM-DD format
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(val)) {
            return false;
          }
          // Check if the date can be converted to a valid date object
          const date = new Date(`${val}T00:00:00Z`);
          return !isNaN(date.getTime());
        },
        {
          message: "Invalid date format. Must be YYYY-MM-DD",
        }
      ),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
      user: z.string().optional(),
      facility: z.string(),
      payableAmount: z
        .number()
        .min(0, "Payable amount must be a non-negative number")
        .optional(),
      isBooked: z
        .nativeEnum(BOOKING_STATUS, { message: "Invalid booking status" })
        .optional(),
    })
    .refine(
      (body) => {
        const start = new Date(`1980-01-01T${body.startTime}:00`);
        const end = new Date(`1980-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message:
          'Start time should be before End time. Format must be "HH:MM"!',
      }
    ),
});

export const BookingValidation = {
  createBookingSchema,
};
