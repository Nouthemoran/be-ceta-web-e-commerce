import { Category } from '../models/Index';

const categoryController = {
  // Get all categories
  async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get category by ID
  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }

      res.json({ success: true, data: category });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Create new category
  async createCategory(req, res) {
    try {
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json({ success: false, message: 'Name is required' });
      }

      const newCategory = await Category.create({ name, description });
      res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update category
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }

      await category.update({ name, description });
      res.json({ success: true, message: 'Category updated successfully', data: category });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Delete category
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }

      await category.destroy();
      res.json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

export default categoryController;
