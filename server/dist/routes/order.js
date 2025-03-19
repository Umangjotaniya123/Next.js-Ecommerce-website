import express from "express";
import { adminOnly, isUserLogin } from "../middlewares/auth.js";
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, processOrder } from "../controllers/order.js";
const app = express.Router();
app.post("/new", newOrder);
app.get("/my", isUserLogin, myOrders);
app.get("/all", allOrders);
app.route("/:id")
    .get(getSingleOrder)
    .put(processOrder)
    .delete(adminOnly, deleteOrder);
export default app;
