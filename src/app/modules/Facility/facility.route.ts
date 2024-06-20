import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from '../../middlewares/auth';
import { FacilityValidation } from './facility.validation';
import { FacilityControllers } from './facility.controller';

const router = express.Router();

router.post(
  '',
  AuthValidation(USER_ROLE.admin),
  validateRequest(FacilityValidation.createFacilitySchema),
  FacilityControllers.createFacility,
);
router.get('/', FacilityControllers.getAllFacility);
router.put(
  '/:id',
  AuthValidation(USER_ROLE.admin),
  validateRequest(FacilityValidation.updateFacilitySchema),
  FacilityControllers.updateFacility,
);
router.delete(
  '/:id',
  AuthValidation(USER_ROLE.admin),
  FacilityControllers.deleteFacility,
);

export const FacilityRoutes = router;
