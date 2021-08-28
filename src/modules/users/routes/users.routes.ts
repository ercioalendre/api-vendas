import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import usersController from "@UsersControllers/UsersController";
import usersAvatarController from "@UsersControllers/UserAvatarController";
import isAuthenticated from "@middlewares/isAuthenticated";
import upload from "@config/upload";
import multer from "multer";

const usersRouter = Router();
const uploadFile = multer(upload.multer);

usersRouter.get("/", isAuthenticated, usersController.index);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  "/avatar",
  isAuthenticated,
  uploadFile.single("avatar"),
  usersAvatarController.update,
);

export default usersRouter;
