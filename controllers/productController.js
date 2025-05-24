import { Product, Category } from '../models/Index.js';
import { generateCustomId } from '../utils/generateCustomId.js';

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const { name, description, imageUrl, categoryId } = req.body;

    // Pastikan categoryId ada di database
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const newProduct = await Product.create({
      name,
      description,
      imageUrl,
      categoryId,
    });

    res.status(201).json({ message: 'Product Created', data: newProduct });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create product', error: error.message });
  }
};

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({include: Category});
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
    const { name, description, imageUrl, categoryId } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update({
      name,
      description,
      imageUrl,
      categoryId,
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

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
