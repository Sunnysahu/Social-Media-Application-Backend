import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Get all Posts");
});

router.get("/:id", (req, res) => {
    res.send("Get Post by ID");
});

router.post("/", (req, res) => {
    res.send("Create Post");
});

router.put("/:id", (req, res) => {
    res.send("Update Post");
});

router.delete("/:id", (req, res) => {
    res.send("Delete Post");
});

export default router;