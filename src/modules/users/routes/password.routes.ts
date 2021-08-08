import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import ForgottenPasswordController from "@UsersControllers/password/ForgottenPasswordController";
import ResetPasswordController from "@UsersControllers/password/ResetPasswordController";

const PasswordRouter = Router();
const forgottenPasswordController = new ForgottenPasswordController();
const resetPasswordController = new ResetPasswordController();

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
  "/reset",
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      newPassword: Joi.string().required(),
      newPasswordConfirmation: Joi.string()
        .required()
        .valid(Joi.ref("newPassword")),
    },
  }),
  resetPasswordController.create,
);

export default PasswordRouter;
