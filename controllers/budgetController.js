import { validationResult } from "express-validator";
import Budget from "../models/Budget.js";

export const createBudget = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { limit, period, category } = req.body;

  try {
    const newBudget = new Budget({
      limit,
      period,
      category,
      user: req.userId,
    });

    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.userId });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const updatedBudget = await Budget.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBudget);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Бюджет удалён" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
