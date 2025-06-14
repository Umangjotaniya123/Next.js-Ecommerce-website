import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { getBarCharts, getDashboardStats, getLineCharts, getPieCharts } from "../controllers/dashboard.js";
const app = express.Router();
app.get("/stats", getDashboardStats);
app.get("/pie", adminOnly, getPieCharts);
app.get("/bar", adminOnly, getBarCharts);
app.get("/line", adminOnly, getLineCharts);
export default app;
