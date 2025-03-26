import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { deleteCategory, getAllCategories, newCategory, updateCategory } from '../controllers/category.js';

const app = express.Router();

app.post('/new', adminOnly, newCategory);

app.get('/all', getAllCategories);

app.route('/:id')
    .put(adminOnly, updateCategory)
    .delete(adminOnly, deleteCategory);

export default app;