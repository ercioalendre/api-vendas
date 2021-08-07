import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import PasswordController from "@UsersControllers/PasswordController";

const PasswordRouter = Router();
const passwordController = new PasswordController();

PasswordRouter.post(
  "/forgotten",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  passwordController.create,
);

export default PasswordRouter;
