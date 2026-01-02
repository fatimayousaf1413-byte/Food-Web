const express = require("express");
const router = express.Router();
const axios = require("axios");
const orderModel = require("../Models/order");

router.post("/stripe-webhook", express.json(), async (req, res) => {
  try {
    const { success, orderId } = req.body;

    if (success === "true" && orderId) {
      // Find order by ID
      const order = await orderModel.findById(orderId);
      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      // Update order payment details
      order.status = "paid";
      order.payment = true;
      order.paidAt = new Date();

      // Save order
      await order.save();

      // Prepare payload for n8n webhook
      const payload = {
        orderId: order._id.toString(),
        paymentId: order.paymentId || "unknown",
        amount: order.amount,
        currency: order.currency || "INR",
        paymentStatus: "paid",
        customer: {
          name: order.customer?.name || "",
          email: order.customer?.email || "",
          phone: order.customer?.phone || "",
        },
      };

      // Send payload to n8n webhook
      await axios.post("http://localhost:5678/webhook-test/payment_completed", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: "Payment failed or missing orderId" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
