import express from "express";
import sessionsRouter from "@UsersRoutes/sessions.routes";
import usersRouter from "@UsersRoutes/users.routes";
import productsRouter from "@ProductsRoutes/products.routes";
import uploadConfig from "@config/upload";
import isAuthenticated from "@middlewares/isAuthenticated";
import passwordRouter from "@UsersRoutes/password.routes";
import profileRouter from "@UsersRoutes/profile.routes";
import customersRouter from "@CustomersRoutes/customers.routes";
import ordersRouter from "@OrdersRoutes/orders.routes";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/sessions", sessionsRouter);
router.use("/user/password", passwordRouter);
router.use("/user/profile", profileRouter);
router.use("/products", productsRouter);
router.use("/customers", customersRouter);
router.use("/orders", isAuthenticated, ordersRouter);
router.use("/uploads", isAuthenticated, express.static(uploadConfig.directory));

export default router;
