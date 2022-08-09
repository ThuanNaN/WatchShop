import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import {removeItemFromCart, addItemToCart} from '../../redux/callAPI/cartCall'
import CardItem from '../../components/CardItem'
import NewNavbar from '../../components/NewNavbar'
import MetaData from  '../../components/MetaData'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {Typography} from '@mui/material';
import Loader from '../../components/Loader'


const EmptyCart =  styled.div`
  margin: auto;
  text-align: center;
  padding: 10vmax;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > svg {
    font-size: 5vmax;
    color: tomato;
  }
  > p {
    font-size: 2vmax;
  }
  > a {
    background-color: rgb(51, 51, 51);
    margin-top:10px;
    color: white;
    border: none;
    padding: 1vmax 3vmax;
    cursor: pointer;
    font: 400 1vmax "Roboto";
    text-decoration: none;
    &:hover {
      background-color: rgba(15, 15, 15, 0.5);
    }
  }
  > div{
    display:flex;
  }
`

const CartPage = styled.div`
  padding: 5vmax;
`

const CartHeader = styled.div`
  background-color: rgb(22, 26, 38);
  width: 90%;
  box-sizing: border-box;
  margin: auto;
  color: white;
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  font: 300 0.7vmax "Roboto";
  > p {
    font-size: 16px;
    margin: 10px;
  }
  > p:last-child {
    text-align: end;
  }
`

const CartContainer = styled.div`
  border-bottom: 2px solid black;
  width: 90%;
  margin: auto;
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
`


const CartInput = styled.div`
  display: flex;
  align-items: center;
  height: 8vmax;
`


const Button = styled.button`
  border: none;
  width: 3vmax;

  background-color: rgba(0, 0, 0, 0.616);
  padding: 0.5vmax;
  cursor: pointer;
  color: white;
  
  transition: all 0.5s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.767);
    }
`


const Quantity = styled.span`
    
  border: none;
  padding: 0.5vmax;
  width: 3vmax;
  text-align: center;
  outline: none;
  
  font: 600 1.2vmax "Roboto";
  color: rgba(0, 0, 0, 0.74);
`

const CartSubTotal = styled.p`
  display: flex;
  padding: 0.5vmax;
  height: 8vmax;
  align-items: center;
  box-sizing: border-box;
  font: 300 1vmax cursive;
  justify-content: flex-end;
  color: rgba(0, 0, 0, 0.753);
`

const Checkout = styled.div`

text-align: center;
padding: 20px;

`
const ButtonCheckout = styled.button`
    width: 20vmax;
    height: 3vmax;
    background-color:tomato;
    &:hover {
      background-color: rgb(192, 71, 50);
    }
`


const Cart = () => {

  const dispatch = useDispatch();
  const history = useNavigate();

  const {cartItems, isLoading } = useSelector((state)=>state.cart)

  const descQuantity = (id, quantity) => {
    const newQuantity = quantity - 1;
    if (1 >= quantity) return ;
    dispatch(addItemToCart([id,newQuantity]));
  }

  const incQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1; 
    if (stock <= quantity) return;
    dispatch(addItemToCart([id,newQuantity]));
  }

  const removeCartItem = (id) =>{
    dispatch(removeItemFromCart(id))
  }

  const TotalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price, 0 
  )

  const handleClick = ()=> {
    history("/shipping-info")
  }


  return (
    <Fragment>
      {/* {isLoading ? (<Loader/>): */}

      <Fragment>
         <MetaData title = "Giỏ hàng"/>
      <NewNavbar/>

            {cartItems.length === 0 ? (
              <EmptyCart>
                <RemoveShoppingCartIcon/>
                <Typography>Không có sản phẩm nào trong giỏ hàng</Typography>
                <Link to="/products">Xem thêm các sản phẩm</Link>
              </EmptyCart>
            )
            :
            (
              <Fragment> 
                 <CartPage>
                   <CartHeader>
                      <p>Sản phẩm</p>
                      <p>Số lượng</p>
                      <p>Tổng tiền</p>
                   </CartHeader>

                  {cartItems && cartItems.map((item)=>(
                    <CartContainer key = {item.product}> 
                        <CardItem item = {item}  removeCartItem = {removeCartItem} />
                        <div>
                          <CartInput>
                            
                              <Button onClick={()=>descQuantity(item.product, item.quantity)}> - </Button>

                              <Quantity readOnly type="number">{item.quantity}</Quantity>
                              
                              <Button onClick={()=>incQuantity(item.product,item.quantity,item.stock)} > + </Button>

                          </CartInput>
                          <p>Trong kho: {item.stock} </p>
                        </div>
                        <CartSubTotal>{`${(item.price * item.quantity).toLocaleString()} đ`}</CartSubTotal>
                      
                    </CartContainer> 
                  ))}

                  <Checkout>
                    <ButtonCheckout onClick={handleClick}>Đặt hàng</ButtonCheckout>
                  </Checkout>
                  
                 </CartPage>
              
        </Fragment> 
      )}
      </Fragment>
      {/* } */}
    </Fragment>
  )
}

export default Cart