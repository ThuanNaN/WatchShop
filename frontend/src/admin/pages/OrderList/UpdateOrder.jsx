import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link, useNavigate } from 'react-router-dom'
import {GetOrderDetail} from '../../../redux/callAPI/orderCall'
import MetaData from '../../../components/MetaData';
import TopBar from '../../components/topbar/TopBar';
import SideBar from '../../components/sidebar/SideBar';
import Loader from '../../../components/Loader'
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { UpdateOrderAdmin } from '../../../redux/callAPI/orderCall';
import {OrderSlice} from '../../../redux/Slice/orderSlice'
import { getProductDetail } from '../../../redux/callAPI/productCall';

const UpdateProcessOrderPage = styled.div`
    flex: 4;
    padding: 20px;

`
const Button = styled.button`


`

const OrderDetailsPage = styled.div`
  background-color: white;
`

const OrderDetailsContainer = styled.div`
  padding: 2vmax;
  padding-bottom: 0%;
  > h2 {
    font: 300 2vmax "Roboto";
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
const UpdateOrderForm = styled.form`
margin: 5vmax 0;
padding: 3vmax; 
> div {
    display: flex;
    width: 100%;
    align-items: center;
  }
  > div > select {
    padding: 1vmax 4vmax;
    margin: 2rem 0;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax cursive;
    outline: none;
  }
  > div > svg {
    position: absolute;
    transform: translateX(1vmax);
    font-size: 1.6vmax;
    color: rgba(0, 0, 0, 0.623);
  }
`


const UpdateOrder = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const idOrder = location.pathname.split("/")[3];
    const {isLoading, error, order} = useSelector(state => state.getOrder)
    const {isUpdated,updateError} = useSelector(state => state.DeleteUpdateOrder)
    const {product } = useSelector((state) => state.product);

    const [status, setStatus] = useState("");

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");
    const [strap,setStrap] = useState("");
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState("");
    const [discount, setDiscount] = useState(0);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(UpdateOrderAdmin([idOrder,{status}]))
    };


    useEffect(()=>{
        if (isUpdated){
            alert("Đã cập nhật trạng thái đơn hàng")
            dispatch(OrderSlice.actions.UpdateOrderReset());
            history(`/admin/order/${idOrder}`)
        }
        
        dispatch(GetOrderDetail(idOrder));
    }, [dispatch,idOrder, isUpdated])


  return (
    <Fragment>
        <MetaData title = "Update Order"/>
        <TopBar/>
        <div style={{display:"flex"}}>
            <SideBar/>
            {isLoading ? <Loader/> : (
                <UpdateProcessOrderPage>
                
                    <OrderDetailsPage>
                    <OrderDetailsContainer>
                        <Typography component="h2">
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

                


                <UpdateOrderForm  onSubmit={updateOrderSubmitHandler}>
                <h2>Trạng thái đơn hàng</h2>

                <div>
                  <AccountTreeIcon />
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Chọn trạng thái</option>
                    {order.orderStatus === "Đang xử lý" && (
                      <option value="Đang giao hàng">Đang giao hàng</option>
                    )}

                    {order.orderStatus === "Đang giao hàng" && (
                      <option value="Đã giao hàng">Đã giao hàng</option>
                    )}
                  </select>
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={ isLoading ? true : false || status === "" ? true : false }
                >
                  Cập nhật
                </Button>
              </UpdateOrderForm>
         
    
          </UpdateProcessOrderPage>
                
            )}
        </div>
    </Fragment>
  )
}

export default UpdateOrder