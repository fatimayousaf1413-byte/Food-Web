const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/upload")
const foodModel = require("../Models/food")
const fs = require("fs")

router.post("/create-food", upload.single("image"), async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const image_filename = req.file ? req.file.filename : null;
        console.log(req.body)
        if (!name || !description || !price || !category || !image_filename) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const food = await foodModel.create({
            name,
            description,
            price,
            image: image_filename,
            category
        })
        await food.save();
        res.status(200).json({ success: true, message: "Food created successfully", food });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Error while creating food" });
    }
})

router.get("/get-all-foods", async (req, res) => {
    try {
        const foods = await foodModel.find();
        res.status(200).json({ success: true, message: "All foods displayed successfully", foods });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Error while getting all foods" });
    }
})

router.delete("/delete-food/:id", async (req, res) => {
    try {
        await foodModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "food deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Error while deleting food" });
        console.log(err)
    }
})



module.exports = router;