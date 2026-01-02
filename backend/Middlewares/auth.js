const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(400).json({ success: false, message: "Unauthorized! Please login " });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error in authentication" });
    }
}

module.exports = authMiddleware;