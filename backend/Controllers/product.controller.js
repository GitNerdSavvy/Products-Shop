import Product from '../models/product.model.js';
import mongoose from 'mongoose';



// Get all products
export const getProducts = async (req, res) => {
    try {
        console.log('Fetching products...');  // This will log when the function is called
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


// Create a new product
export const createProduct = async (req, res) => {
    const { name, price, image } = req.body;

    // Validate required fields
    if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: "Provide all required details" });
    }

    const newProduct = new Product({ name, price, image });

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product Deleted" });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const productData = req.body;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
