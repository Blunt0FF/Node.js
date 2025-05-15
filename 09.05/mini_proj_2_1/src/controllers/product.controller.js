import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
    try {
        const { name, quantity, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newProduct = await Product.create({ name, quantity, price });

        res.status(201).json({ message: 'Product is added', newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
    }

}