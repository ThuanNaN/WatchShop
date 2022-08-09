import React, { Fragment, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import MetaData from '../../components/MetaData'
import NewNavbar from '../../components/NewNavbar'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {saveShippingInfo} from '../../redux/callAPI/cartCall'
import CheckoutSteps from '../../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'

const Title = styled.h1`
  margin: 20px;
  font-size: 40px;
  font-weight: 600;
  display: flex;
  justify-content: center;
`

const ShippingInfoContainer = styled.div`
  display: flex;
  justify-content: center;
`

const CustomOrderButton = styled.div`
  padding: 20px;
  margin: 20px;
  display: flex;
  justify-content: center;
`


const Button = styled.button`
  background-color: tomato;
  color: white;
  width: 30ch;
  padding: 1vmax;
  border: none;
  margin: auto;
  cursor: pointer;
  transition: 0.5s;
  font: 400 1.2vmax "Roboto";

  &:hover {
    background-color: rgb(192, 71, 50);
  }

`

const ShippingInfo = () => {

  const dispatch = useDispatch();
  const history = useNavigate();

  const {shippingInfo} = useSelector(state => state.cart);

  const [fullName, setFullName] = useState(shippingInfo.fullName);
  const [address, setAddress] = useState(shippingInfo.address);
  const [email, setEmail] = useState(shippingInfo.email);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

  const handleClick = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      alert("Số điện thoại không hợp lệ !!");
      return;
    } 
    dispatch(saveShippingInfo({fullName,address,email,phoneNumber}))
    history("/order/comfirm")
  }


  return (
    <Fragment>
      <MetaData title="Thông tin giao hàng"/>
      <NewNavbar/>
      <CheckoutSteps activeStep={0} />
      <Title>Thông tin vận chuyển</Title>
      <ShippingInfoContainer>
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { m: 1, width: '50ch'}
          }}
          noValidate
          autoComplete='off'
        >
          <div>
            <TextField
              required
              label='Họ Tên'
              variant='filled'
              placeholder='Nguyễn Văn A'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              label='Địa chỉ'
              variant='filled'
              value={address}
              placeholder='Số X, Đường A, Phường A, Thành phố B, Tỉnh C'
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              label='Email'
              variant='filled'
              value={email}
              placeholder='abc@gmail.com'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              label='SĐT'
              variant='filled'
              value={phoneNumber}
              placeholder='09xxxxxxxx'
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </Box>
      </ShippingInfoContainer>
      <CustomOrderButton>
        <Button 
          // variant='contained'
          onClick={handleClick}
        >Bước tiếp theo</Button>
      </CustomOrderButton>
      <Footer/>
    </Fragment>
  );
}

export default ShippingInfo