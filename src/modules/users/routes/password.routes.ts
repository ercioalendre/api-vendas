import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import ForgottenPasswordController from "@UsersControllers/password/ForgottenPasswordController";
import ResetPasswordController from "@UsersControllers/password/ResetPasswordController";
import ChangePasswordController from "@UsersControllers/password/ChangePasswordController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const PasswordRouter = Router();
const changePasswordController = new ChangePasswordController();
const forgottenPasswordController = new ForgottenPasswordController();
const resetPasswordController = new ResetPasswordController();

PasswordRouter.put(
  "/change",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      currentPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
      newPasswordConfirmation: Joi.string()
        .required()
        .valid(Joi.ref("newPassword")),
    },
  }),
  changePasswordController.update,
);

PasswordRouter.post(
  "/forgotten",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgottenPasswordController.create,
);

PasswordRouter.post(
  "/reset/:token",
  celebrate({
    [Segments.BODY]: {
      newPassword: Joi.string().required(),
      newPasswordConfirmation: Joi.string()
        .required()
        .valid(Joi.ref("newPassword")),
    },
    [Segments.PARAMS]: {
      token: Joi.string().uuid().required(),
    },
  }),
  resetPasswordController.create,
);

export default PasswordRouter;
