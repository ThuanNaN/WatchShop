import {createSlice} from "@reduxjs/toolkit"
import {CreateOrder, MyOrders, GetOrderDetail, GetAllOrderAdmin,
    UpdateOrderAdmin, DeleteOrderAdmin
} from '../callAPI/orderCall'

export const newOrderSlice = createSlice({
    name: "newOrder",
    initialState:{
        order: {},
        isLoading: true,
        error:null, 
    },
    reducers:{
        clearErr: (state)=>{
            state.error = null
        }
    },
    extraReducers:{
        [CreateOrder.pending]:(state)=>{
            state.isLoading = true
            state.error = false
        },
        [CreateOrder.fulfilled]:(state, action)=>{
            state.isLoading = false
            state.error = false
            state.order = action.payload
        },
        [CreateOrder.rejected]:(state)=>{
            state.isLoading = false
            state.error = true
        },
    }
})

export const myOrderSlice = createSlice({
    name: "myOrder",
    initialState:{
        orders: [],
        isLoading: true,
        error: null,
    },
    reducers:{
        clearErr:(state)=>{
            state.error = null
        }
    },
    extraReducers:{
        [MyOrders.pending]:(state)=>{
            state.error = false
            state.isLoading = true
        },
        [MyOrders.fulfilled]:(state, action)=>{
            state.orders = action.payload
            state.error = false
            state.isLoading = false
        },  
        [MyOrders.rejected]:(state)=>{
            state.error = true
            state.isLoading = false
        },
    }
})


export const getOrderDetailSlice =  createSlice({
    name:'getOrderDetail',
    initialState:{
        order:{},
        isLoading: true,
        error: null,
    },
    reducers:{
        clearErr:(state)=>{
            state.error = null
        }
    },
    extraReducers:{
        [GetOrderDetail.pending]:(state)=>{
            state.error = false
            state.isLoading = true
        },
        [GetOrderDetail.fulfilled]:(state, action)=>{
            state.order = action.payload
            state.error = false
            state.isLoading = false
        },  
        [GetOrderDetail.rejected]:(state)=>{
            state.error = true
            state.isLoading = false
        },
    }
});

export const getAllOrderSlice = createSlice({
    name:"getAllOrderAdmin",
    initialState:{
        orders: [],
        isLoading: true,
        error: null,
    },
    reducers:{
        clearErr:(state)=>{
            state.error = null
        }
    },
    extraReducers:{
        [GetAllOrderAdmin.pending]:(state)=>{
            state.error = false
            state.isLoading = true
        },
        [GetAllOrderAdmin.fulfilled]:(state, action)=>{
            state.orders = action.payload
            state.error = false
            state.isLoading = false
        },  
        [GetAllOrderAdmin.rejected]:(state)=>{
            state.error = true
            state.isLoading = false
        },
    }
})


export const OrderSlice = createSlice({
    name:"UpdateDeleteOrder",
    initialState:{
        isDeleted: null,
        isUpdated: null,
        isLoading: true,
        updateError: null,
        deleteError: null,
    },
    reducers:{
        clearupdateError:(state)=>{
            state.updateError = null
        },
        cleardeleteError:(state)=>{
            state.deleteError = null
        },
        UpdateOrderReset: (state)=>{
            state.isUpdated = false
        },
        DeleteOrderReset: (state)=>{
            state.isDeleted = false
        }
    },
    extraReducers:{
        [UpdateOrderAdmin.pending]:(state)=>{
            state.updateError = false
            state.isLoading = true
        },
        [UpdateOrderAdmin.fulfilled]:(state, action)=>{
            state.isUpdated = action.payload
            state.updateError = false
            state.isLoading = false
        },  
        [UpdateOrderAdmin.rejected]:(state)=>{
            state.updateError = true
            state.isLoading = false
        },

        //delete order
        [DeleteOrderAdmin.pending]:(state)=>{
            state.deleteError = false
            state.isLoading = true
        },
        [DeleteOrderAdmin.fulfilled]:(state, action)=>{
            state.isDeleted = action.payload
            state.deleteError = false
            state.isLoading = false
        },  
        [DeleteOrderAdmin.rejected]:(state)=>{
            state.deleteError = true
            state.isLoading = false
        },
    }
})