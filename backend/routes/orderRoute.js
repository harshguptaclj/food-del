import express from "express"
import authMiddleware from "../middleware/auth.js"
import { listOrders, placeOrder, placeOrderCod, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get("/list",authMiddleware,listOrders);
orderRouter.post("/status",authMiddleware,updateStatus);
orderRouter.post("/placecod",authMiddleware,placeOrderCod);

export default orderRouter;