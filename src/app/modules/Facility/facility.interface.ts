import { Model } from 'mongoose';

export type TFacility = {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  isDeleted: boolean;
};

export interface FacilityModel extends Model<TFacility> {
  isFacilityExistsByid(id: string): Promise<TFacility>;
}
