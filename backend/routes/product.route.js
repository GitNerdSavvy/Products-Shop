import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../Controllers/product.controller.js';
const router = express.Router();


// Route to get all products
router.get("/", getProducts);

// Route to create a new product
router.post("/", createProduct);

// Route to update a product by ID
router.put("/:id", updateProduct);

// Route to delete a product by ID
router.delete("/:id", deleteProduct);

export default router;
