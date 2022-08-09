import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes ,Route, Navigate} from "react-router-dom"
import Home from './pages/Home'

import AboutUs from './pages/infoPages/AboutUs'
import Warranty from './pages/infoPages/Warranty'
import ShippingPolicy from './pages/infoPages/ShippingPolicy'

import Login from './pages/userPages/Login'
import Register from './pages/userPages/Register';
import Account from './pages/userPages/Account'
import UpdateProfile from './pages/userPages/UpdateProfile'
import UpdatePassword from './pages/userPages/UpdatePassword';
import ForgotPassword from './pages/userPages/ForgotPassword';
import ResetPassword from './pages/userPages/ResetPassword';

import ProductList from './pages/product/ProductList'
import ProductDetail from './pages/product/ProductDetail';

import Cart from './pages/cart/Cart'
import ShippingInfo from './pages/cart/ShippingInfo';
import Payment from './pages/cart/Payment';
import SuccessOrder from './pages/cart/SuccessOrder';
import ConfirmOrder from './pages/cart/ConfirmOrder';

import MyOrder from './pages/orderPages/MyOrder'
import OrderDetail from './pages/orderPages/OrderDetail';


import AdminHome from './admin/pages/AdminHome/AdminHome';
import AdminOrderList from './admin/pages/OrderList/AdminOrderList' 
import AdminProductList from './admin/pages/ProductList/AdminProductList';
import AdminUserList from './admin/pages/UserList/AdminUserList';
import { useSelector } from 'react-redux';
import UpdateOrder from './admin/pages/OrderList/UpdateOrder';
import UpdateUser from './admin/pages/UserList/UpdateUser';
import UpdateProduct from './admin/pages/ProductList/UpdateProduct';
import NewProduct from './admin/pages/ProductList/NewProduct';

const App = () => {

  const ScrollTotTop = () => {
    window.scrollTo(0, 0);
    return null;
  }

  const {currentUser} = useSelector((state)=>state.user)

  return (
    <BrowserRouter>
      <Routes><Route path='/' element={[<ScrollTotTop/>,<Home/>]} /></Routes>
      
      <Routes> <Route path='/about-us' element={[<ScrollTotTop/>,<AboutUs/>]} /> </Routes>
      <Routes> <Route path='/warranty' element={[<ScrollTotTop/>,<Warranty/>]} /> </Routes>
      <Routes> <Route path='/shipping-policy' element={[<ScrollTotTop/>,<ShippingPolicy/>]} /> </Routes>

      <Routes><Route path='/login' element={[<ScrollTotTop/>,<Login/>]} /> </Routes>
      <Routes> <Route path='/register' element={[<ScrollTotTop/>,<Register/>]} /></Routes>
      <Routes> <Route path='/account' element={<Account/>} /></Routes>
      <Routes> <Route path='/me/update' element={<UpdateProfile/>} /></Routes>
      <Routes> <Route path='/password/update' element={<UpdatePassword/>} /></Routes>
      <Routes> <Route path='/password/forgot' element={<ForgotPassword/>} /></Routes>
      <Routes> <Route path='/password/reset/:token' element={<ResetPassword/>} /></Routes>

      <Routes><Route path='/products/:category' element={[<ScrollTotTop/>,<ProductList/>]} /></Routes>
      <Routes> <Route path='/product/:id' element={[<ScrollTotTop/>,<ProductDetail/>]} /></Routes>
      <Routes> <Route path='/products' element={[<ScrollTotTop/>,<ProductList/>]} /></Routes>
      <Routes> <Route path='/product-search/:keyword' element={[<ScrollTotTop/>,<ProductList/>]} /></Routes>

      <Routes> <Route path='/cart' element={[ScrollTotTop,<Cart/>]} /></Routes>
      <Routes> <Route path='/shipping-info' element={[ScrollTotTop,<ShippingInfo/>]} /></Routes>
      <Routes> <Route path='/order/comfirm' element={[ScrollTotTop,<ConfirmOrder/>]} /></Routes>
      <Routes> <Route path='/order/payment' element={[ScrollTotTop,<Payment/>]} /></Routes>
      <Routes> <Route path='/order/success' element={[ScrollTotTop,<SuccessOrder/>]} /></Routes>

      <Routes> <Route path='/orders' element={[ScrollTotTop, <MyOrder/>]} /></Routes>
      <Routes> <Route path='/orders/:id' element={[ScrollTotTop, <OrderDetail/>]} /></Routes>

      <Routes> 
        <Route path='/admin/home' 
          element={ currentUser && currentUser.role === "admin" ?  
            [<ScrollTotTop/>,<AdminHome/>]:
            <Navigate to = "/" />
          } /> 
      </Routes>

      <Routes> 
        <Route path='/admin/orders' 
          element={ currentUser && currentUser.role === "admin" ? 
            [<ScrollTotTop/>,<AdminOrderList/>] :
            <Navigate to = "/" />
           } /> 
      </Routes>

      <Routes> 
        <Route path='/admin/order/:id' 
          element={
            currentUser && currentUser.role === "admin" ? 
            [<ScrollTotTop/>,<UpdateOrder/>]:
            <Navigate to = "/" />
          } /> 
      </Routes>

      <Routes> 
        <Route path='/admin/products' 
          element={
            currentUser && currentUser.role === "admin" ? 
            [<ScrollTotTop/>,<AdminProductList/>]:
            <Navigate to = "/" />
          }/> 
      </Routes>

      <Routes> 
        <Route path='/admin/product/:id' 
        element={
          currentUser && currentUser.role === "admin" ? 
          [<ScrollTotTop/>,<UpdateProduct/>]:
          <Navigate to = "/" />
        }/> 
      </Routes>

      <Routes> 
        <Route path='/admin/new/product' 
          element={
            currentUser && currentUser.role === "admin" ? 
            [<ScrollTotTop/>,<NewProduct/>]:
            <Navigate to = "/" />
          } /> 
      </Routes>

      <Routes> 
        <Route path='/admin/users' 
          element={
            currentUser && currentUser.role === "admin" ? 
            [<ScrollTotTop/>,<AdminUserList/>]:
            <Navigate to = "/" />
          } /> 
        </Routes>

      <Routes> 
        <Route path='/admin/user/:id' 
          element={
            currentUser && currentUser.role === "admin" ? 
            [<ScrollTotTop/>,<UpdateUser/>]:
            <Navigate to = "/" />
          } /> 
      </Routes>
      


    </BrowserRouter>
  )
}

export default App