import express from "express";

const router = express.Router();

router.get("/:postId", (req, res) => {
    res.send("Get all Comments");
});

router.post("/:postId", (req, res) => {
    res.send("create new comment");
});

router.put("/:postId/:commentId", (req, res) => {
    res.send("Update Comment");
});

router.delete("/:postId/:commentId", (req, res) => {
    res.send("Delete Comment");
});

export default router;