const Product = require('../models/Product');

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, imageUrl } = req.body;

    const newProduct = await Product.create({
      name,
      price,
      description,
      stock,
      imageUrl,
    });

    res.status(201).json({ message: 'Product Created', data: newProduct });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create product', error: error.message });
  }
};

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get products', error: error.message });
  }
};

// GET PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get product', error: error.message });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, stock, imageUrl } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update({
      name,
      price,
      description,
      stock,
      imageUrl,
    });

    res.status(200).json({ message: 'Product Updated', data: product });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update product', error: error.message });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();

    res.status(200).json({ message: 'Product Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
