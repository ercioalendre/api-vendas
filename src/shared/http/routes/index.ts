import productsRouter from "@ProductsRoutes";
import usersRouter from "@UsersRoutes";
import { Router } from "express";
const router = Router();
router.use("/products", productsRouter);
router.use("/users", usersRouter);
export default router;
