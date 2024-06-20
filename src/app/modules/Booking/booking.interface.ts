import { Types } from 'mongoose';
import { BOOKING_STATUS } from './booking.constant';

export type TBooking = {
  date: string;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount?: number;
  isBooked: keyof typeof BOOKING_STATUS;
};

export type TSchedule = {
  date: string;
  startTime: string;
  endTime: string;
};
