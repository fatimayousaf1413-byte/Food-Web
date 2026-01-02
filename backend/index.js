const express = require("express");
const mongoose = require("mongoose");
const foodRoutes = require("./Routes/foodRoutes")
const userRoutes = require("./Routes/userRoutes")
const cartRoutes = require("./Routes/cartRoutes")
const orderRoutes = require("./Routes/orderRoutes")
const stripeRoutes = require("./Routes/stripeRoutes")
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get("/", async (req, res) => { res.send("Backend is working") })
app.use("/api/food", foodRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/stripe", stripeRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch(err => {
            console.error("MongoDB connection error:", err);
        });
});
