import sessionsRouter from "@SessionsRoutes";
import usersRouter from "@UsersRoutes";
import productsRouter from "@ProductsRoutes";
import uploadConfig from "@config/upload";
import isAuthenticated from "@middlewares/isAuthenticated";
import express from "express";
import PasswordRouter from "@modules/users/routes/password.routes";
const router = express.Router();
router.use("/products", productsRouter);
router.use("/users", usersRouter);
router.use("/sessions", sessionsRouter);
router.use("/uploads", isAuthenticated, express.static(uploadConfig.directory));
router.use("/password", PasswordRouter);
export default router;
