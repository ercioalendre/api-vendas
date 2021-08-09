import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import isAuthenticated from "@middlewares/isAuthenticated";
import profileController from "@UsersControllers/ProfileController";

const profileRouter = Router();

profileRouter.use(isAuthenticated);

profileRouter.get("/", profileController.show);

profileRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      newName: Joi.string(),
      newEmail: Joi.string().email(),
    },
  }),
  profileController.update,
);

export default profileRouter;
