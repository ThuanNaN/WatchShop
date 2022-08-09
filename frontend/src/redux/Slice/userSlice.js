import {createSlice} from "@reduxjs/toolkit"
import {login, register, loadUser, logout, 
        updateProfile ,updatePassword,
        forgotPassword, resetPassword,
        getAllUser, getUserDetailAdmin, 
        updateUserRole, deleteUser
    } from  '../callAPI/userCall'

export const UserSlice = createSlice({
    name:'user',
    initialState:{
        currentUser:{},
        isLoading: null,
        isAuthenticated : null,
        error: null,
        registerSuccess:null,
    },
    reducers:{
        clearErr: (state) => {
            state.error = null
        },
        clearRegisterSuccess: (state) => {
            state.registerSuccess = null
        },
    },
    extraReducers:{
        
        //LOGIN
        [login.pending] : (state)=>{
            state.isLoading = true
            state.error = false
        },
        [login.fulfilled] : (state,action)=>{
            state.isLoading = false
            state.currentUser = action.payload
            state.isAuthenticated = true
            state.error = false
        },
        [login.rejected] : (state)=>{
            state.isLoading = false
            state.error = true
        },

        //REGISTER
        [register.pending] :(state)=>{
            state.isLoading = true
            state.error = false
        },
        [register.fulfilled] :(state)=>{
            state.isLoading = false
            state.registerSuccess = true
            state.error = false
        },
        [register.rejected] :(state)=>{
            state.isLoading = false
            state.error = true
        },

        //LOADUSER
        [loadUser.pending]:(state)=>{
            state.isLoading = true
            state.error = false
        },
        [loadUser.fulfilled]:(state, action)=>{
            state.isLoading = false
            state.currentUser = action.payload
            state.isAuthenticated = true
            state.error = false
        },
        [loadUser.rejected]:(state)=>{
            state.isLoading = false
            state.error = true
        },

        //LOGOUT
        [logout.pending]:(state)=>{
            state.isLoading = true
            state.error = false
        },
        [logout.fulfilled]:(state)=>{
            state.isLoading = false
            state.currentUser = null
            state.isAuthenticated = false
        },
        [logout.rejected]:(state)=>{
            state.isLoading = false
            state.error = true
        },

    },
})


export const ProfileSlice = createSlice({
    name:'profile',
    initialState:{
        isUpdated: null,
        isDeleted: null,
        isLoading: null,
        error: null,
    },
    reducers:{
        updateProfileReset: (state) => {
            state.isUpdated = false
        },
        deleteProfileReset: (state) => {
            state.isDeleted = false
        },
        clearErr: (state) => {
            state.error = null
        }
    },
    extraReducers:{

        //UPDATE PROFILE
        [updateProfile.pending] : (state)=>{
            state.isLoading = true
        },
        [updateProfile.fulfilled] : (state,action)=>{
            state.isLoading = false
            state.isUpdated = action.payload

        },
        [updateProfile.rejected] : (state)=>{
            state.isLoading = false
            state.error = true
        },

        //UPDATE PASSWORD
        [updatePassword.pending] : (state)=>{
            state.isLoading = true
        },
        [updatePassword.fulfilled] : (state,action)=>{
            state.isLoading = false
            state.isUpdated = action.payload
        },
        [updatePassword.rejected] : (state)=>{
            state.isLoading = false
            state.error = true
        },
        
        //UPDATE role
        [updateUserRole.pending] : (state)=>{
            state.isLoading = true
        },
        [updateUserRole.fulfilled] : (state,action)=>{
            state.isLoading = false
            state.isUpdated = action.payload
        },
        [updateUserRole.rejected] : (state)=>{
            state.isLoading = false
            state.error = true
        },
        //Delete user
        [deleteUser.pending] : (state)=>{
            state.isLoading = true
        },
        [deleteUser.fulfilled] : (state,action)=>{
            state.isLoading = false
            state.isDeleted = action.payload
        },
        [deleteUser.rejected] : (state)=>{
            state.isLoading = false
            state.error = true
        },
    },
});

export const ForgotPasswordSlice = createSlice({
    name:"forgotPassword",
    initialState:{
        isLoading: null,
        error: null,
        message: null,
        success:null
    },
    reducers:{
        clearErr:(state)=>{
            state.error = null
        },
        clearMessage:(state) => {
            state.message = null
        },
        clearSuccess:(state) => {
            state.success = null
        }
    },
    extraReducers:{
        //  forgot password
        [forgotPassword.pending]:(state) => {
            state.isLoading = true
            state.error = false
        },
        [forgotPassword.fulfilled]:(state, action) => {
            state.message = action.payload
            state.isLoading = false
            state.error = false
        },
        [forgotPassword.rejected]:(state) => {
            state.error = true
            state.isLoading = false
        },

        //resetPassword
        [resetPassword.pending]:(state) => {
            state.isLoading = true
            state.error = false
        },
        [resetPassword.fulfilled]:(state, action) => {
            state.success = action.payload
            state.isLoading = false
        },
        [resetPassword.rejected]:(state) => {
            state.error = true
            state.isLoading = false
        },
    }
})


export const GetAllUserSlice = createSlice({
    name:"getAllUser",
    initialState:{
        users:[],
        isLoading: null,
        error: null,
    },
    reducers:{
        clearErr:(state)=>{
            state.error = null
        }
    },
    extraReducers:{
        [getAllUser.pending]:(state)=>{
            state.isLoading = true
            state.error = false
        },
        [getAllUser.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.error = false
            state.users = action.payload
        },
        [getAllUser.rejected]:(state)=>{
            state.isLoading = false
            state.error = true
        },
    }
})

export const GetUserDetailSlice = createSlice({
    name: "getUserDetail",
    initialState:{
        user: {},
        isLoading: true,
        error: null,
    },
    reducers:{
        clearErr:(state)=>{
            state.error = null
        }
    },
    extraReducers:{
        [getUserDetailAdmin.pending]:(state)=>{
            state.isLoading = true
            state.error = false
        },
        [getUserDetailAdmin.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.error = false
            state.user = action.payload
        },
        [getUserDetailAdmin.rejected]:(state)=>{
            state.isLoading = false
            state.error = true
        },
    }
})
