import { configureStore, combineReducers} from "@reduxjs/toolkit";


import {persistStore,persistReducer, FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {UserSlice, 
        ProfileSlice,
        ForgotPasswordSlice,
        GetAllUserSlice,
        GetUserDetailSlice,
      } from "./Slice/userSlice";

import {productsSlide, productSlice,
  updateDeleteProductSlice,
  newProductSlice
} from "./Slice/productSlice";

import {cartSlice} from './Slice/cartSlice'
import { myOrderSlice, newOrderSlice, getOrderDetailSlice,getAllOrderSlice, OrderSlice } from "./Slice/orderSlice";


const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const rootReducer = combineReducers({
    user: UserSlice.reducer,
    allUser: GetAllUserSlice.reducer,
    userProfile: ProfileSlice.reducer,
    userDetail: GetUserDetailSlice.reducer,
    forgotPassword: ForgotPasswordSlice.reducer,

    products: productsSlide.reducer,
    product: productSlice.reducer,
    newProduct: newProductSlice.reducer,
    updateDeleteProduct: updateDeleteProductSlice.reducer,

    cart: cartSlice.reducer,

    newOrder: newOrderSlice.reducer,
    myOrders: myOrderSlice.reducer,
    getOrder: getOrderDetailSlice.reducer,
    getAllOrders: getAllOrderSlice.reducer,
    DeleteUpdateOrder: OrderSlice.reducer,
    
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store =  configureStore({

    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store)
