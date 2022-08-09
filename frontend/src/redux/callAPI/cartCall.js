
import {publicRequest} from '../requestMethods'
import { createAsyncThunk } from '@reduxjs/toolkit';


//add item to cart
export const addItemToCart = createAsyncThunk(
    "cart/addItem",
    async (idAndQuatity)=>{
        // try{
            const {data} = await publicRequest(
                `product/${idAndQuatity[0]}`,
            )       
            return {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.image,
                stock: data.product.stock,
                quantity: idAndQuatity[1],           
            }
        // }catch(err){
        //     return err.response.data.message
        // }
    }
)

//remove item to cart
export const removeItemFromCart = createAsyncThunk (
    'cart/removeItem',
    async (id)=>{
        try{
            return id;
        }catch(err){
            return err.response.data.message
        }
    }
)
//save shipping info
export const saveShippingInfo = createAsyncThunk(
    'cart/saveShippingInfo',
    async (data) => {
        try{
            return data;
        }catch(err){
            return err.response.data.message
        }
    }
)

