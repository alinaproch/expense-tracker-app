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
