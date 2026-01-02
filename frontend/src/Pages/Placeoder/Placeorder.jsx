import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Placeorder.css'
import { Storecontext } from '../../Context/Storecontext'
import axios from 'axios';

const Placeorder = () => {
    const navigate = useNavigate();
    const { getTotalcartamount, token, food_list, cartitems } = useContext(Storecontext);
    const [data, setdata] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setdata(data => ({ ...data, [name]: value }))
    }

    const sendToWebhook = async (orderData) => {
        try {
            await axios.post("http://localhost:5678/webhook-test/webhook/order_created", orderData, {
                headers: { "Content-Type": "application/json" }
            });
        } catch (error) {
            console.error("Error sending order to webhook:", error);
        }
    }

    const placeOrder = async (e) => {
        e.preventDefault();
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartitems[item._id] > 0) {
                let itemInfo = { ...item };
                itemInfo["quantity"] = cartitems[item._id];
                orderItems.push(itemInfo);
            }
        })

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalcartamount() + 2,
        }

        try {
            // Your existing backend order creation
            let response = await axios.post("http://localhost:3000/api/order/create-order", orderData, { headers: { token } })
            if (response.data.success) {
                // Send the same orderData also to n8n webhook
                await sendToWebhook(orderData);

                const { session_url } = response.data
                window.location.replace(session_url)
            }
            else {
                alert("Error")
            }
        } catch (error) {
            console.error(error);
            alert("Error placing order");
        }
    }

    useEffect(() => {
        if (!token) {
            navigate("/cart")
        }
        else {
            if (getTotalcartamount() === 0) {
                navigate("/cart")
            }
        }
    }, [token])



    return (
        <form onSubmit={placeOrder} className="placeorder">
            <div className="placeorder-left">
                <p className='title'>Delivery Information</p>
                <div className="multifills">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Adress' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
                <div className="multifills">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
                </div>
                <div className="multifills">
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='ZipCode' />
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
            </div>
            <div className="placeorder-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-totals-details">
                            <p>Sub Totals</p>
                            <p>${getTotalcartamount()}</p>
                        </div>
                        <hr />
                        <div className="cart-totals-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalcartamount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-totals-details">
                            <b>Total</b>
                            <b>${getTotalcartamount() === 0 ? 0 : getTotalcartamount() + 2}</b>
                        </div>
                    </div>
                    <button type='submit' >PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </form>
    )
}

export default Placeorder
