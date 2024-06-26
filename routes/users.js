import express from "express";
import { body } from "express-validator";
import { userControllers } from "../controllers/index.js";
const router = express.Router();
router.get("/:id", userControllers.getDetailUser);
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  userControllers.login
);
router.post("/register", userControllers.register);

export default router;
