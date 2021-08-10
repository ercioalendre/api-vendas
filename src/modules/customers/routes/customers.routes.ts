import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import customersController from "@CustomersControllers/CustomersController";

const customersRouter = Router();

customersRouter.use(isAuthenticated);

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
      newCustomerName: Joi.string(),
      newCustomerEmail: Joi.string().email(),
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
