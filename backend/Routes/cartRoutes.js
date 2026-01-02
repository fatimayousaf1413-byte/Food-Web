const express = require("express");
const router = express.Router();
const userModel = require("../Models/user");
const authMiddleware = require("../Middlewares/auth");

router.post("/add-to-cart", authMiddleware, async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData || {};
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.status(200).json({ success: true, message: "Added to cart" });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Error while adding to cart food" });
    }
})

router.post("/remove-to-cart", authMiddleware, async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData || {};
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.status(200).json({ success: true, message: "Removed to cart" });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Error while removing food from cart" });
    }
})

router.post("/get-cart", authMiddleware, async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData || {};
        res.status(200).json({ success: true, message: "All cartitems get", cartData });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Error while getting cart items" });
    }
})



module.exports = router;