import express from "express";
import { studentControllers } from "../controllers//index.js";
const router = express.Router();
router.get("/", studentControllers.getAllStrudents);
router.get("/:id", studentControllers.getStrudentsById);
router.post("/insert", studentControllers.insertStudents);
router.patch("/inserts", studentControllers.updateStudent);
export default router;