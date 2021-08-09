import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import usersController from "@UsersControllers/UsersController";
import usersAvatarController from "@UsersControllers/UserAvatarController";
import isAuthenticated from "@middlewares/isAuthenticated";
import uploadConfig from "@config/upload";
import multer from "multer";

const usersRouter = Router();
const upload = multer(uploadConfig);

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
  upload.single("avatar"),
  usersAvatarController.update,
);

export default usersRouter;
