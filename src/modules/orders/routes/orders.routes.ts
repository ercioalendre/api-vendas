import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import ordersController from "@OrdersControllers/OrdersController";

const ordersRouter = Router();

ordersRouter.get(
  "/:customer_id",
  celebrate({
    [Segments.PARAMS]: {
      customer_id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

ordersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
);

export default ordersRouter;
