import express from "express";
import authController from "../controller/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router()

router.post("/register", authController.register)
router.get("/activation/:id", authController.activation)
router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.get("/refresh", authController.refresh)
router.get("/get-users", authMiddleware, authController.getUsers)

export default router