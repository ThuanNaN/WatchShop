import React, { Fragment, useState } from 'react'
import styled from '@emotion/styled';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';

import { Backdrop, SpeedDial, SpeedDialAction } from '@mui/material';
import { logout } from '../redux/callAPI/userCall';


const StyledSpeedDial = styled(SpeedDial)`
  position: fixed;
  top:8px;
  right:30px;
  z-index:11;
`

const ImageProfile = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 100%;
`


const AccountOptions = ({currentUser}) => {

  const history = useNavigate();
  const dispatch = useDispatch();
  const {cartItems} = useSelector((state)=>state.cart)
  const [open, setOpen] = useState(false);
  
  const options = [
    { icon: <AccountCircleIcon  />, name: 'Thông tin cá nhân', func: account},
    { icon: <ShoppingCartOutlinedIcon style={{color: cartItems.length > 0 ? "tomato" : "unset" }}/>, 
      name: `Giỏ hàng (${cartItems.length})`, func: cart },
    {icon: <ListAltIcon/>, name: 'Đơn hàng', func: orders  },
    { icon: <ExitToAppIcon />, name: 'Đăng xuất', func: logoutUser },
  ];


  if (currentUser.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  
  function cart(){
    history("/cart");
  }

  function orders(){
    history("/orders");
  }

  function account(){
    history("/account");
  }
  function logoutUser(){
    dispatch(logout())
    alert("logout success!")
    history("/")
  }

  function dashboard(){
    history('/admin/home')
  }

  return (
      <Fragment>
        <div style={{width:"10px"}}>
        <Backdrop open={open} style={{zIndex: "10"}}/>
        <StyledSpeedDial
          ariaLabel='SpeedDial controlled open example'
          onClose={()=>setOpen(false)}
          onOpen={()=>setOpen(true)}
          open={open}
          icon= {
            <ImageProfile
              src= {currentUser.avatar ? currentUser.avatar : require("../images/defaultProfileImg.jpg") }
              alt="Profile"
            />
          }
          direction="down"
        >
          {options.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.func}
              // tooltipOpen={window.innerWidth <= 600 ? true : false}
            />
          ))}
        </StyledSpeedDial>
        </div>
      </Fragment>
  );
}

export default AccountOptions