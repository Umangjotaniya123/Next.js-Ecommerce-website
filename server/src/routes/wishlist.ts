import express from 'express';
import { isUserLogin } from '../middlewares/auth.js';
import { addTowishlist, getwishlist, updatewishlist } from '../controllers/wishlist.js';

const app = express.Router();

app.post('/add', isUserLogin, addTowishlist);
app.get('/get', isUserLogin, getwishlist);
app.put('/update', isUserLogin, updatewishlist);

export default app;