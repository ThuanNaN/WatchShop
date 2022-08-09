
import {publicRequest} from '../requestMethods'
import { createAsyncThunk } from '@reduxjs/toolkit';

//get all products  
export const getAllProducts = createAsyncThunk(
    "product/getAllProducts",
    async ({role,category,color, strap, sortType, keyword}) => {
        let link = ""
        switch(role){
            case "newProduct":
                link  = "/products";
                const {data} = await publicRequest.get(link);
                const newProducts = data.products.sort((a,b)=> b.createAt - a.createAt)
                data.products = newProducts.slice(0,8);
                return data
                break;
            case "category":
                if (category){
                    if (category === "phukien"){
                        if(color){
                            link = `/products?strap=phukien&color=${color}`;
                        }
                        else{
                         link = `/products?strap=phukien`;
                        }
                    }
                    else{
                    if (color){
                        if (strap){
                            link = `/products?category=${category}&color=${color}&strap=${strap}`;
                        }
                        else{
                            link = `/products?category=${category}&color=${color}`;
                        }
                    }
                    else{
                        if (strap){
                            link = `/products?category=${category}&strap=${strap}`;
                        }
                        else{
                            link = `/products?category=${category}`;
                        }
                    }   }
                }
                else{
                    if (color){
                        if (strap){
                            link = `/products?color=${color}&strap=${strap}`;
                        }
                        else{
                            link = `/products?color=${color}`;
                        }
                    }
                    else{
                        if (strap){
                            link = `/products?strap=${strap}`;
                        }
                        else{
                            link = `/products`;
                        }
                    }           
                }
                break;
            case "search":
                if (keyword){
                    if (color){
                        if (strap){
                            link = `/products?keyword=${keyword}&color=${color}`;
                        }
                        else{
                            link = `/products?keyword=${keyword}&color=${color}`;
                        }
                    }
                    link = `/products?keyword=${keyword}`;
                }
                else{
                    link = `/products`;
                }
                
                break;
            default:
                link = "/products"
                break;
        }
        const {data} = await publicRequest.get(link);


        if (sortType === "newest"){
            const newProducts = data.products.sort((a,b)=> a.createdAt - b.createdAt)
            data.products = newProducts
            
        }
        else if (sortType ===  "price-asc"){
            const newProducts = data.products.sort((a,b)=> a.price - b.price)
            data.products = newProducts
            
        }
        else if (sortType ===  "price-desc") {
            const newProducts = data.products.sort((a,b)=> b.price - a.price)
            data.products = newProducts
            
        }

        return data
    }
)


//get  product detail 
export const getProductDetail = createAsyncThunk(
    "product/getProductDetail",
    async (id) => {
        const { data } = await publicRequest.get(
            `/product/${id}`
        );
        return data.product
    }
)

//admin
export const getProductAdmin = createAsyncThunk(
    "pruduct/getProductAdmin",
    async () => {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization : `Bearer ${token}`  } }; 
        const { data } = await publicRequest.get(
            "/admin/products",
            config,
        );

        return data
    }
)

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (productData)=>{
 
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization : `Bearer ${token}`  } }; 
        const { data } = await publicRequest.put(
            `admin/product/${productData[0]}`,
            productData[1],
            config
            );
        return data.success
    }
)

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id) => {

            const token = localStorage.getItem("token");
            const config = { headers: { Authorization : `Bearer ${token}`  } }; 
            const {data} = await publicRequest.delete(
                `/admin/product/${id}`,
                config
            );
            return data.success
    }
);

export const newProduct = createAsyncThunk(
    "product/newProduct",
    async (productData) => {

            const token = localStorage.getItem("token");
            const config = { headers: { Authorization : `Bearer ${token}`  } }; 
            const { data } = await publicRequest.post(
                `/admin/product/new`,
                productData,
                config
              );
            return data

    }
)