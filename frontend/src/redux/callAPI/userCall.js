
import {publicRequest} from '../requestMethods'
import { createAsyncThunk } from '@reduxjs/toolkit';

//Login
export const login = createAsyncThunk (
    "user/login",
    async (user)=> {

        const config = { headers: { "Content-Type": "application/json" }, }; 
        const {data} = await publicRequest.post(
            `/login`,
            user,
            config,
        )
        localStorage.setItem("token",data.token)
        return data.user
    }
);


//Regiter
export const register = createAsyncThunk(
    "user/register",
    async (userData) => {
        // try{
            const {data} = await publicRequest.post(
                `/register`, 
                userData
            )
            return data.user
        // }catch(err){
        //     return err.response.data.message
        // }
    }    
);


//Load user
export const loadUser = createAsyncThunk(
    "user/loadUser",
    async () => {
        // try{
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization : `Bearer ${token}`  } }; 
            const {data} = await publicRequest.get(
                `/me`,
                config
            )
            return data.user
        // }catch(err){
        //     return err.response.data.message
        // }
    }
);

//Log out
export const logout = createAsyncThunk(
    'user/logout',
    async()=>{
      
            await publicRequest.get(
                `/logout`
            )
            localStorage.removeItem("token");

       
    }
);

//Update Profile 
export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async(userData)=>{
        // try{
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization : `Bearer ${token}`  } }; 

            const {data} = await publicRequest.put(
                '/me/update',
                userData,
                config,
                
            )
            return data.success
        // }
        // catch(err){
        //     return err.response.data.message
        // }
    }
)

//Update password
export const updatePassword = createAsyncThunk(
    "user/updatePassword",
    async (passwords) => {
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization : `Bearer ${token}`  } }; 
    
            const {data} = await publicRequest.put(
                '/password/update',
                passwords,
                config,
            )
            return data.success 
    }
);

//forgot password
export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async (email)=>{
        // try{
            const {data} = await publicRequest.post(
                '/password/forgot',
                email,
            )
            return data.message 
        // }catch(err){
        //     return err.response.data.message
        // }
    }
)

//reset password
export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (TokenAndPassword)=>{
        // try{
            const {data} = await publicRequest.put(
                `/password/reset/${TokenAndPassword[0]}`,
                TokenAndPassword[1]
            )
            return data.success
        }
    //     catch(err){
    //         return err.response.data.message
    //     }
    // }
)

//admin
export const getAllUser = createAsyncThunk(
    "user/getAllUser",
    async () => {
        try{
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization : `Bearer ${token}`  } }; 
            const { data } = await publicRequest.get(
                `/admin/users`,
                config
            );
            return data.users      
        }
        catch(err){
            return err.response.data.message
        }
    }
)

export const getUserDetailAdmin = createAsyncThunk(
    "user/getUserDetailAdmin",
    async (id) => {
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization : `Bearer ${token}`  } }; 
            const { data } = await publicRequest.get(
                `/admin/user/${id}`,
                config
            );
            return data.user 
    }
)

export const updateUserRole = createAsyncThunk(
    "user/updateUserRole",
    async (userData)=> {
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization : `Bearer ${token}`  } }; 
            const { data } = await publicRequest.put(
                `/admin/user/${userData[0]}`,
                userData[1],
                config
              );
            return data.success
    }
)

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id) => {
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization : `Bearer ${token}`  } }; 
            const { data } = await publicRequest.delete(
                `/admin/user/${id}`,
                config
            );
            return data.success
    }
)