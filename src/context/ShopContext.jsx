import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Product from "../pages/Product";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext();

const safeClone = (obj) => {
  // structuredClone fallback for older envs
  try {
    return structuredClone(obj);
  } catch (e) {
    return JSON.parse(JSON.stringify(obj ?? {}));
  }
};


const ShopContextProvider = (props) => {

    const currency = '₹';

    const delivery_fee = 10
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] =useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    const addToCart = async (itemId, color) => {

        if(!color){
            toast.error("Select product color");
            return;
        }
        
        

        let cartData = safeClone(cartItems ?? {});
        // structuredClone(cartItems);
        console.log("cartItmes:",cartItems);
        console.log(cartData);
        

        if(cartData[itemId]){
            if(cartData[itemId][color]){
                cartData[itemId][color] += 1;
            }else{
                cartData[itemId][color] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][color] = 1;
        }

        setCartItems(cartData);

        if(token){
            try {
                const response = await axios.post(backendUrl + '/api/cart/add', {itemId, color}, {headers:{token}})
                console.log(response.data);
                
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    toast.error(error.message)
                }
            }
        }
        return totalCount
    }

    const updateQuantity = async (itemId, color, quantity)=>{
        let cartData =  safeClone(cartItems ?? {});
        cartData[itemId][color] = quantity;

        setCartItems(cartData);
        if(token){
            try {
                const response = await axios.post(backendUrl + '/api/cart/update',{itemId, color, quantity}, {headers:{token}});
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = ()=> {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items)
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }


    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if(response.data.success){
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}})

            if(response.data.success){
                setCartItems(response.data.cartData)
                console.log("respons:",response.data);
                
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData();
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    },[])

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;