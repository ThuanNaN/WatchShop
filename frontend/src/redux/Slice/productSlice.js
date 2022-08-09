import { createSlice } from "@reduxjs/toolkit";
import {getProductDetail, getAllProducts, getProductAdmin,
        updateProduct, deleteProduct, newProduct} from '../callAPI/productCall'
 
export const productSlice = createSlice({
    name:"product",
    initialState:{
        product:null,
        isLoading: true,
        error: null,
    },
    reducers:{
        clearError:(state) =>{
            state.error = null
        }
    },
    extraReducers:{
        [getProductDetail.pending]:(state)=>{
            state.isLoading = true
            state.error = false
        },
        [getProductDetail.fulfilled]:(state, action)=>{
            state.product = action.payload
            state.isLoading = false
            state.error = false
        },
        [getProductDetail.rejected]:(state)=>{
            state.product = null
            state.error = true
            state.isLoading = false
        },
    }
})

export const productsSlide = createSlice({
    name:"products",
    initialState:{
        products:[],
        isLoading: null,
        error: null,
        productsCount: 0,
        resultPerPage: 0,
        filteredProductsCount: 0,
        
    },
    reducers:{
        clearError:(state) =>{
            state.error = null
        }
    },
    extraReducers:{
        [getAllProducts.pending]:(state)=>{
            state.isLoading = true
            state.error = false
        },
        [getAllProducts.fulfilled]:(state, action)=>{
            state.isLoading = false
            state.products = action.payload.products
            state.productsCount =  action.payload.productsCount
            state.resultPerPage = action.payload.resultPerPage
            state.filteredProductsCount =  action.payload.filteredProductsCount
            state.error = false
        },
        [getAllProducts.rejected]:(state)=>{
            state.isLoading = false
            state.error = true
        },
        
        //Admin
        [getProductAdmin.pending]:(state)=>{
            state.isLoading = true
            state.error = false
        },
        [getProductAdmin.fulfilled]:(state, action)=>{
            state.isLoading = false
            state.products = action.payload.products
            state.error = false
        },
        [getProductAdmin.rejected]:(state)=>{
            state.isLoading = false
            state.error = true
        },
    }
})


export const updateDeleteProductSlice = createSlice({
    name:"updateDeleteProduct",
    initialState:{
        isDeleted:null,
        isUpdated:null,
        isLoading: true,
        error: null,
    },
    reducers:{
        clearErr:(state)=>{
            state.error = null
        },
        updateProuctReset:(state)=>{
            state.isUpdated = false
        },
        deleteProuctReset:(state)=>{
            state.isDeleted = false
        }
    },
    extraReducers:{
        //Update
        [updateProduct.pending]:(state)=>{
            state.isLoading = true
            state.error = false
        },
        [updateProduct.fulfilled]:(state, action)=>{
            state.isUpdated = action.payload
            state.isLoading = false
            state.error = false
        },
        [updateProduct.rejected]:(state)=>{
            state.isLoading = false
            state.error = true
        }, 


        //Delete
        [deleteProduct.pending]:(state)=>{
            state.isLoading = true
            state.error = false
        },
        [deleteProduct.fulfilled]:(state, action)=>{
            state.isDeleted = action.payload
            state.isLoading = false
            state.error = false
        },
        [deleteProduct.rejected]:(state)=>{
            state.isLoading = false
            state.error = true
        }, 
    }
});

export const newProductSlice = createSlice({
    name:"newProduct",
    initialState:{
        product: {},
        success: null,
        isLoading:true,
        error: null,
    },
    reducers:{
        clearErr:(state)=>{
            state.error = null
        },
        newProductReset:(state)=>{
            state.success = false
        }
    },
    extraReducers:{
        [newProduct.pending]:(state) => {
            state.isLoading = true
            state.error = false
        },
        [newProduct.fulfilled]:(state, action) => {
            state.isLoading = false
            state.error = false
            state.success = action.payload.success
            state.product = action.payload.product
        },
        [newProduct.rejected]:(state) => {
            state.isLoading = false
            state.error = true
        },
    }
})