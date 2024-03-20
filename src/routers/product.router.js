import express from 'express';
import { addProduct, getProduct, getProductById, removeProduct, updateProduct } from '../controllers/product';

const router = express.Router();

router.get('/products', getProduct);
router.get(`/products/:id`, getProductById);
router.post('/products', addProduct);
router.put(`/products/:id`, updateProduct);
router.delete(`/products/:id`, removeProduct);

export default router;