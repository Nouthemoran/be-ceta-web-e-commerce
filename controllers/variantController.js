const { ProductVariant, Product } = require('../models/Index');

// CREATE PRODUCT VARIANT
const createProductVariant = async (req, res) => {
  try {
    const { productId, size, designName, designImageUrl, material, sku, stock, price, isDefault, weight } = req.body;

    // Pastikan productId ada di database
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(400).json({ message: 'Product not found' });
    }

    const newVariant = await ProductVariant.create({
      productId,
      size,
      designName,
      designImageUrl,
      material,
      sku,
      stock,
      price,
      isDefault,
      weight,
    });

    res.status(201).json({ message: 'Product Variant Created', data: newVariant });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product variant', error: error.message });
  }
};

// GET ALL VARIANTS FOR A PRODUCT
const getProductVariants = async (req, res) => {
  try {
    const { productId } = req.params;

    const variants = await ProductVariant.findAll({ where: { productId } });

    res.status(200).json({ message: 'Product Variants Retrieved', data: variants });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get product variants', error: error.message });
  }
};

// GET SINGLE VARIANT BY ID
const getProductVariantById = async (req, res) => {
  try {
    const { id } = req.params;

    const variant = await ProductVariant.findByPk(id);
    if (!variant) {
      return res.status(404).json({ message: 'Product Variant not found' });
    }

    res.status(200).json({ message: 'Product Variant Retrieved', data: variant });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get product variant', error: error.message });
  }
};

// UPDATE PRODUCT VARIANT
const updateProductVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const { size, designName, designImageUrl, material, sku, stock, price, isDefault, weight } = req.body;

    const variant = await ProductVariant.findByPk(id);
    if (!variant) {
      return res.status(404).json({ message: 'Product Variant not found' });
    }

    await variant.update({
      size,
      designName,
      designImageUrl,
      material,
      sku,
      stock,
      price,
      isDefault,
      weight,
    });

    res.status(200).json({ message: 'Product Variant Updated', data: variant });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product variant', error: error.message });
  }
};

// DELETE PRODUCT VARIANT
const deleteProductVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const variant = await ProductVariant.findByPk(id);
    if (!variant) {
      return res.status(404).json({ message: 'Product Variant not found' });
    }

    await variant.destroy();

    res.status(200).json({ message: 'Product Variant Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product variant', error: error.message });
  }
};

module.exports = {
  createProductVariant,
  getProductVariants,
  getProductVariantById,
  updateProductVariant,
  deleteProductVariant,
};
