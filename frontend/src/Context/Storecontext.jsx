import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Storecontext = createContext(null)

const StorecontextProvider = (props) => {
    const [cartitems, setcartitems] = useState({})
    const [token, setToken] = useState("")
    const [food_list, setfood_list] = useState([]);

    const addTocart = async (itemId) => {
        if (!cartitems[itemId]) {
            setcartitems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setcartitems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post("http://localhost:3000/api/cart/add-to-cart", { itemId }, { headers: { token } })
        }
    }

    const removeTocart = async (itemId) => {
        setcartitems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post("http://localhost:3000/api/cart/remove-to-cart", { itemId }, { headers: { token } })
        }
    }

    const getTotalcartamount = () => {
        let totalAmount = 0;
        for (const item in cartitems) {
            if (cartitems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartitems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodlist = async () => {
        const response = await axios.get("http://localhost:3000/api/food/get-all-foods")
        setfood_list(response.data.foods)
    }

    const loadCartData = async (token) => {
        const response = await axios.post("http://localhost:3000/api/cart/get-cart", {}, { headers: { token } })
        setcartitems(response.data.cartData)
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodlist();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartitems,
        setcartitems,
        addTocart,
        removeTocart,
        getTotalcartamount,
        token,
        setToken,
    }

    return (
        <Storecontext.Provider value={contextValue}>
            {props.children}
        </Storecontext.Provider>
    )

}

export default StorecontextProvider;