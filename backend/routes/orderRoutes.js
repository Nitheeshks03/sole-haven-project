import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect,admin, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);


export default router;
