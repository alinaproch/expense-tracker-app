import { validationResult } from "express-validator";
import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;

  try {
    const newCategory = new Category({
      name,
      user: req.userId,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.userId });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Категория не найдена" });
    }

    if (category.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Нет доступа" });
    }

    await category.deleteOne();
    res.json({ message: "Категория удалена" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const updateCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Категория не найдена" });
    }

    if (category.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Нет доступа" });
    }

    category.name = name ?? category.name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
