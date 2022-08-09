import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import MetaData from '../../components/MetaData'
import NewNavbar from '../../components/NewNavbar'
import {GetOrderDetail} from '../../redux/callAPI/orderCall'
import Loader from '../../components/Loader'
import { Typography } from '@mui/material'
import styled from '@emotion/styled'
import {mobile} from '../../responsive'

const OrderDetailsPage = styled.div`
  background-color: white;
`

const OrderDetailsContainer = styled.div`
  padding: 5vmax;
  padding-bottom: 0%;
  > h1 {
    font: 300 3vmax "Roboto";
    margin: 4vmax 0;
    color: tomato;
  }
  > p {
    font: 400 1.8vmax "Roboto";
  }
`

const OrderDetailsContainerBox = styled.div`
  margin: 2vmax;
  > div {
    display: flex;
    margin: 1vmax 0;
  }
  > div > p {
    font: 400 1vmax "Roboto";
    color: black;
  }
  > div > span {
    margin: 0 1vmax;
    font: 100 1vmax "Roboto";
    color: #575757;
  }
`

const OrderDetailsCartItems = styled.div`
  padding: 2vmax 5vmax;
  border-top: 1px solid rgba(0, 0, 0, 0.164);
  > p {
    font: 400 1.8vmax "Roboto";
  }
`

const OrderDetailsCartItemsContainer = styled.div`
margin: 2vmax;
> div {
  display: flex;
  font: 400 1vmax "Roboto";
  align-items: center;
  margin: 2vmax 0;
}
> div > img {
  width: 3vmax;
}
> div > a {
  color: #575757;
  margin: 0 2vmax;
  width: 60%;
  text-decoration: none;
}
> div > span {
  font: 100 1vmax "Roboto";
  color: #5e5e5e;
}
`


const OrderDetail = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const idOrder = location.pathname.split("/")[2];
 
  useEffect(()=>{
    // if (error){

    // }

    dispatch(GetOrderDetail(idOrder));
  }, [dispatch, idOrder])

  const {order, error, isLoading} = useSelector((state)=>state.getOrder)

  return (
    <Fragment>
        <MetaData title = 'Chi tiết đơn hàng'/>
        <NewNavbar/>
        {isLoading ? <Loader/> : 
        (<Fragment>
            
              <OrderDetailsPage>
                <OrderDetailsContainer>
                  <Typography component="h1">
                    Mã đơn hàng: #{order && order._id}
                  </Typography>
                  <Typography>Thông tin giao hàng</Typography>
                  <OrderDetailsContainerBox>
                    <div>
                      <p>Tên khách hàng:</p>
                      <span>{order.shippingInfo.fullName}</span>
                    </div>
                    <div>
                      <p>Số điện thoại:</p>
                      <span>
                        {order.shippingInfo.phoneNumber}
                      </span>
                    </div>
                    <div>
                      <p>Địa chỉ giao hàng:</p>
                      <span>
                        {order.shippingInfo.address}
                      </span>
                    </div>
                  </OrderDetailsContainerBox>

                  <Typography>Thanh toán</Typography>
                  <OrderDetailsContainerBox>
                    <div>
                      <p>
                        {order.payment}
                      </p>
                    </div>

                    <div>
                      <p>Tổng tiền:</p>
                      <span>{order.totalPrice && order.totalPrice} VNĐ</span>
                    </div>
                  </OrderDetailsContainerBox>

                  <Typography>Trạng thái đơn hàng</Typography>
                  <OrderDetailsContainerBox>
                    <div>
                      <p>{order.orderStatus} </p>
                    </div>
                  </OrderDetailsContainerBox>
                </OrderDetailsContainer>


                <OrderDetailsCartItems>
                  <Typography>Sản phẩm:</Typography>
                  <OrderDetailsCartItemsContainer>
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X {item.price} ={" "}
                            <b>{item.price * item.quantity} VNĐ</b>
                          </span>
                        </div>
                      ))}
                  </OrderDetailsCartItemsContainer>
                </OrderDetailsCartItems>
            </OrderDetailsPage>

        </Fragment>)}
        <Footer/>
    </Fragment>
  )
}

export default OrderDetail