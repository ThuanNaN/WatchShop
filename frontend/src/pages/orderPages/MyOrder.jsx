import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom'
import { MyOrders } from '../../redux/callAPI/orderCall'
import LaunchIcon from '@mui/icons-material/Launch';
import Loader from '../../components/Loader'
import { Typography } from '@mui/material';
import {DataGrid} from '@mui/x-data-grid'
import styled from '@emotion/styled'
import { mobile } from '../../responsive'
import NewNavbar from '../../components/NewNavbar';
import Footer from '../../components/Footer';
import MetaData from '../../components/MetaData';

const MyOrderPage = styled.div`
  width: 100vw;
  max-width: 100%;
  padding: 0 7vmax;
  box-sizing: border-box;
  background-color: rgb(235, 235, 235);
  top: 0;
  left: 0;
  height: 90vh;
  display: flex;
  flex-direction: column;
`

const MyOrderTable = styled(DataGrid)`
  background-color: white;
  > div {
    font: 300 1vmax "Roboto";
    color: rgba(0, 0, 0, 0.678);
    border: none;
  }
  > a {
    color: rgba(0, 0, 0, 0.527);
    transition: all 0.5s;
  }
  > a:hover {
    color: tomato;
  }
  > MuiDataGrid-columnHeader {
    background-color: tomato;
    padding: 1vmax !important;
  }
  > MuiDataGrid-columnHeader div {
    color: rgb(255, 255, 255);
    font: 500 1.1vmax "Roboto" !important;
  }
  > MuiDataGrid-iconSeparator {
    display: none !important;
  }

`

const MyOrdersHeading = styled(Typography)`
  text-align: center;
  font: 400 1.2vmax "Roboto";
  padding: 0.5vmax;
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  transition: all 0.5s;
  background-color: rgb(44, 44, 44);

  ${mobile({
    font: "400 2.2vmax",
    padding: "4vw",
  })}

`



const MyOrder = () => {

  const dispatch = useDispatch();
  const history = useNavigate();
  const {currentUser} = useSelector((state)=>state.user);
  const {orders, error, isLoading} = useSelector((state)=>state.myOrders);


  const columns = [
    { field: "id", headerName: "ID đơn hàng", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Tiền đơn hàng",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Chi tiết",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/orders/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });


  useEffect(()=>{
    dispatch(MyOrders());
  }, [dispatch])


  return (
    <Fragment>
      <MetaData title="Danh sách đơn hàng" />
      <NewNavbar/>
      {isLoading ? <Loader/> : (
        <Fragment>
          <MyOrderPage>
            <MyOrderTable
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
            <MyOrdersHeading >Đơn đặt hàng của {currentUser.name} </MyOrdersHeading>
          </MyOrderPage>
        </Fragment>
      )}
      <Footer/>
    </Fragment>
  )
}

export default MyOrder