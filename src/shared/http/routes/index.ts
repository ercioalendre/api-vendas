import productsRouter from "@ProductsRoutes";
import { Router } from "express";
const router = Router();
router.use("/products", productsRouter);
export default router;
