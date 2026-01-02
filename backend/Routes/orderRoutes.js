const express = require("express");
const router = express.Router();
const Stripe = require("stripe")
const orderModel = require("../Models/order")
const userModel = require("../Models/user");
const authMiddleware = require("../Middlewares/auth");
const axios = require("axios")
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

router.post("/create-order", authMiddleware, async (req, res) => {
    try {
        const frontend_url = process.env.FRONTEND_URL
        const { items = [], amount, address, userId } = req.body;
        if (items.length === 0 || !amount || !address || !userId) {
            return res.status(400).json({ success: false, message: "Missing items, amount, address, or userId" });
        }

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity,
        }))
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery-Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        })

        const newOrder = await orderModel.create({
            userId,
            items,
            amount,
            currency: "Doller",
            address,
            status: "pending",
            payment: false,
            customer: {
                name: req.body.customerName,
                email: req.body.customerEmail,
                phone: req.body.customerPhone,
            }
        })

        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            metadata: {
                orderId: newOrder._id.toString(),
                userId: userId,
            },
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });


        res.status(200).json({ success: true, message: "Order placed successfully", session_url: session.url });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error while creating user" });
        console.log(error)
    }
})



// router.post("/verify-order", async (req, res) => {
//     try {
//         const { success, orderId } = req.body;

//         if (!orderId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "OrderId missing",
//             });
//         }

//         if (success === "true") {
//             await orderModel.findByIdAndUpdate(orderId, { payment: true });
//             return res.status(200).json({
//                 success: true,
//                 message: "Payment verified",
//             });
//         } else {
//             await orderModel.findByIdAndDelete(orderId);
//             return res.status(200).json({
//                 success: false,
//                 message: "Payment failed",
//             });
//         }


//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: "Error while payment verification",
//         });
//     }
// });


router.post("/verify-order", async (req, res) => {
    try {
        const { success, orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "OrderId missing",
            });
        }

        // ❌ Payment failed
        if (success !== "true") {
            await orderModel.findByIdAndDelete(orderId);
            return res.status(200).json({
                success: false,
                message: "Payment failed",
            });
        }

        // ✅ Payment success
        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { payment: true },
            { new: true }
        );

        // ✅ DATA TO SEND TO WEBHOOK
        const webhookPayload = {
            event: "payment_success",
            orderId: order._id,
            amount: order.amount,
            paymentStatus: order.payment,
            status: order.status,
            customer: {
                userId: order.userId,
                address: order.address,
            },
            items: order.items,
            createdAt: order.createdAt,
        };

        // ✅ SEND TO YOUR WEBHOOK
        await axios.post(
            "http://localhost:5678/webhook-test/payment_completed", // 🔥 set this in .env
            webhookPayload,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return res.status(200).json({
            success: true,
            message: "Payment verified & webhook sent",
        });

    } catch (error) {
        console.error("Webhook error:", error.message);

        res.status(500).json({
            success: false,
            message: "Payment verified but webhook failed",
        });
    }
});


router.post("/user-order", authMiddleware, async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.status(200).json({ success: true, message: "Order get successfully", data: orders });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error while getting order" });
        console.log(error)
    }
})

router.get("/list-order", async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).json({ success: true, message: "Order get successfully", data: orders });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error while getting order" });
        console.log(error)
    }
})

router.post("/order-status", async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.status(200).json({ success: true, message: "Status Updated" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error while updating status" });
        console.log(error)
    }
})

module.exports = router;