import { Router } from "express";
import {
  createItem,
  deleteItem,
  getInventory,
  getItem,
  updateItem,
} from "../controllers/ims.controllers.js";

const router = Router();

router.get("/api/products", getInventory);
router.get("/api/products/:id", getItem);
router.post("/api/products/add", createItem);
router.delete("/api/products/:id", deleteItem);
router.patch("/api/products/:id", updateItem);

export default router;
