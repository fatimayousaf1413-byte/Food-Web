const express = require("express");
const userModel = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(400).json({ success: false, message: "Email already exist" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await userModel.create({
            name,
            email,
            password: hashPassword,
        })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.status(200).json({ success: true, message: "User created successfully", user, token });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error while creating user" });
        console.log(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const { password, email } = req.body;
        if (!password || !email) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const existUser = await userModel.findOne({ email });
        if (!existUser) {
            return res.status(400).json({ success: false, message: "Email doesnot exist please signup" });
        }
        const isMatch = await bcrypt.compare(password, existUser.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET)
        res.status(200).json({ success: true, message: "Login Successfully", token });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error while creating user" });
    }
})

module.exports = router;