import express from 'express';
import { connectDB } from './utils/features.js';
import { errorMiddkeware } from './middlewares/error.js';
import NodeCache from 'node-cache';
import { config } from 'dotenv';
import morgan from 'morgan';
import Stripe from 'stripe';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// importting Routes
import userRoute from './routes/user.js'
import productRoute from './routes/products.js'
import orderRoute from './routes/order.js'
import paymentRoute from './routes/payment.js'
import dashboardRoute from './routes/dashboard.js'
import cartItemsRoute from './routes/cartItems.js'
import wishlistRoute from './routes/wishlist.js'
import categoryRoute from './routes/category.js'

config({
    path: './.env',
})

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_SECRET_KEY || "";

connectDB(mongoURI);

export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT,
    credentials: true
}));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});


// Using Routes 
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use("/api/v1/cartItems", cartItemsRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/category", categoryRoute)

app.use('/uploads', express.static("uploads"));
app.use(errorMiddkeware)

app.listen(port, () => {
    console.log(`Server is working on port:${port}`)
});