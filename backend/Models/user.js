const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        cartData: { type: Object, default: {} },
    },
    { minimize: false }
);

module.exports = mongoose.model("User", Schema);
