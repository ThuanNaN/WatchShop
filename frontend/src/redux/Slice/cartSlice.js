import {createSlice} from "@reduxjs/toolkit"
import {addItemToCart,removeItemFromCart, saveShippingInfo} from '../callAPI/cartCall'

export const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems:[],
        shippingInfo:{
            name:"",
            address: "",
            email:"",
            phoneNumber:"",
        },
        isLoading: null,
        error: null,
    },
    reducers:{
        clearErr:(state)=>{
            state.error = null
        },
        clearCart:(state)=>{
            state.cartItems = []
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearShippingInfo:(state)=>{
            state.shippingInfo = {}
        }
    },
    extraReducers:{
        //ADD ITEM
        [addItemToCart.pending]:(state) => {
            state.isLoading = true
            state.error = false
        },
        [addItemToCart.fulfilled]:(state,action) => {
            state.isLoading =  false
            const item =  action.payload
            const isItemExist = state.cartItems.find(
                (i)=> i.product === item.product
            );
            if (isItemExist){
                // xử lý congf65 thêm nếu đã tồn tại chứ k phải thay thế 
                state.cartItems = state.cartItems.map((i)=> i.product === isItemExist.product ? item : i) 
            }
            else{
                state.cartItems = [...state.cartItems,item]
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            state.error = false
        },
        [addItemToCart.rejected]:(state) => {
            state.isLoading = false
            state.error = true
        },

        //REMOVE ITEM
        [removeItemFromCart.pending]:(state)=>{
            state.isLoading = true
            state.error = false
        },
        [removeItemFromCart.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.cartItems = state.cartItems.filter((i)=>i.product !== action.payload)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            state.error = false
        },
        [removeItemFromCart.rejected]:(state)=>{
            state.isLoading = false
            state.error = true
        },

        //Save shipping info
        [saveShippingInfo.pending]:(state)=>{
            state.isLoading = true
        },
        [saveShippingInfo.fulfilled]:(state, action)=>{
            state.isLoading = false
            state.shippingInfo = action.payload
            localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
            state.error = false
        },
        [saveShippingInfo.rejected]:(state)=>{
            state.isLoading = false
            state.error = true
        },
    }
})