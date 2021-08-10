import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import customersController from "@CustomersControllers/CustomersController";

const customersRouter = Router();

customersRouter.get("/", customersController.index);

customersRouter.get(
  "/:customerId",
  celebrate({
    [Segments.PARAMS]: {
      customerId: Joi.string().uuid().required(),
    },
  }),
  customersController.show,
);

customersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      customerName: Joi.string().required(),
      customerEmail: Joi.string().email().required(),
    },
  }),
  customersController.create,
);

customersRouter.put(
  "/:customerId",
  celebrate({
    [Segments.BODY]: {
      customerName: Joi.string().required(),
      customerEmail: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      customerId: Joi.string().uuid().required(),
    },
  }),
  customersController.update,
);

customersRouter.delete(
  "/:customerId",
  celebrate({
    [Segments.PARAMS]: {
      customerId: Joi.string().uuid().required(),
    },
  }),
  customersController.delete,
);

export default customersRouter;
