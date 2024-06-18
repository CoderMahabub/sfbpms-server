import express from "express";
import { AuthValidation } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../User/user.constant";
import { FacilityValidation } from "./facility.validation";
import { FacilityControllers } from "./facility.controller";
const router = express.Router();

router.post(
  "/",
  AuthValidation(USER_ROLE.admin),
  validateRequest(FacilityValidation.createFacilitySchema),
  FacilityControllers.createFacility
);

export const FacilityRoutes = router;
