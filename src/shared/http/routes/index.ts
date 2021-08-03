import sessionsRouter from "@SessionsRoutes";
import usersRouter from "@UsersRoutes";
import productsRouter from "@ProductsRoutes";
import { Router } from "express";
const router = Router();
router.use("/products", productsRouter);
router.use("/users", usersRouter);
router.use("/sessions", sessionsRouter);
export default router;
