import React, { Fragment, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {CreateOrder} from '../../redux/callAPI/orderCall'
import {cartSlice} from '../../redux/Slice/cartSlice'
import Footer from '../../components/Footer'
import Button from '@mui/material/Button';

const Title = styled.h1`
  padding: 20px;
  text-align: center;
  font-size: 35px;
`;
const Image = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
`;

const InfoContainer = styled.div`
  flex: 1;
  text-align: center;
  width: 100%;
  heigth: 100%;
`;

const Payment = () => {
    
    const history = useNavigate();
    const dispatch = useDispatch();

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const {shippingInfo, cartItems} = useSelector((state) => state.cart);



    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);



    const handleChangCheckBox = (e) => {
        e.preventDefault();
        setChecked1(!checked1);
        setChecked2(!checked2);
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        shippingPrice:  orderInfo.shippingCharges,
        discountPrice: orderInfo.discountPrice,
        totalPrice: orderInfo.totalPrice,
        payment: checked1 ? "Thanh toán khi nhận hàng": "Phương thức khác",
    }

    console.log(order)

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(CreateOrder(order))
        dispatch(cartSlice.actions.clearCart())
        history("/order/success")
    }

  return (
    <Fragment>
        <div>
            <Title>PHƯƠNG THỨC THANH TOÁN</Title>
            <InfoContainer>
                {/*checked1*/}
                <FormControlLabel 
                    label="Thanh toán khi nhận hàng"
                    control={
                        <Checkbox 
                            checked={checked1}
                            onChange={handleChangCheckBox}
                        />
                    }
                />
                <br/> 
                {/*checked2*/}
                <FormControlLabel 
                    label="Thẻ ngân hàng / ví điện tử" 
                    control={
                        <Checkbox 
                            checked={checked2}
                            onChange={handleChangCheckBox}
                        />
                    } 
                />
            <br/>
            <Button variant="outlined" size="medium" onClick={handleClick}>Xác nhận</Button>
           
            </InfoContainer>
        </div>
        <Image src="https://callio.vn/wp-content/uploads/2021/10/HC7aV9oK68FhcwcXbt_Lg24p2KwrW67siw.png"></Image> 
        <Footer/>
    </Fragment>
  )
}

export default Payment