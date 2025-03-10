import express from 'express';
import { addToWatchList, getWatchList } from '../controllers/watchList.js';
import { isUserLogin } from '../middlewares/auth.js';
const app = express.Router();
app.post('/add', isUserLogin, addToWatchList);
app.get('/get', isUserLogin, getWatchList);
export default app;
