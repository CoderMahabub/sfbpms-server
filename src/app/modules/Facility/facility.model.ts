import { Schema, model } from 'mongoose';
import { FacilityModel, TFacility } from './facility.interface';

const facilitySchema = new Schema<TFacility, FacilityModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

facilitySchema.statics.isFacilityExistsByid = async function (id: string) {
  return await Facility.findById(id);
};

export const Facility = model<TFacility, FacilityModel>(
  'Facility',
  facilitySchema,
);
