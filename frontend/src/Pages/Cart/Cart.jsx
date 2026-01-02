import React, { useContext } from 'react'
import './Cart.css'
import { Storecontext } from '../../Context/Storecontext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartitems, food_list, removeTocart, getTotalcartamount } = useContext(Storecontext);
    const navigate = useNavigate()

    console.log(cartitems, "+++")

    return (
        <div className="cart">
            <div className="cart-item">
                <div className="cart-item-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartitems[item?._id]) {
                        return (
                            <div>
                                <div className='cart-item-title cart-item-item'>
                                    <img src={`http://localhost:3000/uploads/${item.image}`} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartitems[item._id]}</p>
                                    <p>${item.price * cartitems[item._id]}</p>
                                    <p className='cross' onClick={() => removeTocart(item._id)} >X</p>
                                </div>
                                <hr />
                            </div>
                        )
                    }
                })}
            </div>
            <div className="cart-bottom">
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
                    <button onClick={() => navigate('/order')} >PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promocode, Enter it here</p>
                        <div className='cart-promocode-input'>
                            <input type="text" placeholder='Promo Code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;