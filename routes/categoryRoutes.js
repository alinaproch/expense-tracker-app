import express from "express";
import { check } from "express-validator";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  [check("name", "Имя категории не может быть пустым").not().isEmpty()],
  protect,
  createCategory
);
router.get("/", protect, getCategories);
router.put("/:id", protect, updateCategory);
router.delete("/:id", protect, deleteCategory);

export default router;
