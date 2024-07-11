import express from "express";
import postController from "../controller/post.controller";
import authMiddleware from "../middleware/auth.middleware";
import authhorMiddleware from "../middleware/author.middleware";

const router = express.Router()

router.get("/get-all", postController.getAll)
router.post("/create", authMiddleware, postController.create)
router.delete("/delete/:id", authMiddleware, authhorMiddleware, postController.delete)
router.put("/edit/:id", authMiddleware, postController.update)
router.get("/get-one/:id", postController.getOne)

export default router