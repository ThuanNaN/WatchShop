import React, { Fragment, useEffect } from 'react'
import SideBar from '../../components/sidebar/SideBar'
import TopBar from '../../components/topbar/TopBar'
import styled from '@emotion/styled'
import { Link, useNavigate } from 'react-router-dom'
import {DataGrid} from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllOrderAdmin, UpdateOrderAdmin, DeleteOrderAdmin } from '../../../redux/callAPI/orderCall'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {OrderSlice, getAllOrderSlice} from '../../../redux/Slice/orderSlice'
import MetaData from '../../../components/MetaData'

const ProductListHeading = styled.h1`
  font: 400 2rem "Roboto";
  padding: 0.5vmax;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.637);
  transition: all 0.5s;
  margin: 2rem;
  text-align: center;
`


const OrderListContainer = styled.div`
  flex: 4;
  padding: 20px;
`

const StyledLink =  styled(Link)`
    &:focus, &:visited, &:link, &:active {
        text-decoration: none;
        color:black;
    }
    &:hover {
      color: blue;
    }
`

const Button = styled.button`
    &:hover{
      background-color:red;
    }
`

const AdminOrderList = () => {

  const dispatch = useDispatch();
  const history = useNavigate();
  const {orders, error} = useSelector((state)=>state.getAllOrders)
  const {isUpdated, isDeleted, deleteError } = useSelector(state => state.DeleteUpdateOrder)

  const deleteOrderHandler = (id) => {
    dispatch(DeleteOrderAdmin(id))
  }

  useEffect(()=>{
    if (error){
      alert("Lỗi !")
      dispatch(getAllOrderSlice.actions.clearErr())
    }
    if (deleteError){
      alert("Lỗi !")
      dispatch(OrderSlice.actions.cleardeleteError())
    }

    if (isDeleted) {
      alert("Đã xóa đơn hàng");
      dispatch(OrderSlice.actions.DeleteOrderReset())
      history("/admin/orders")
    }

    dispatch(GetAllOrderAdmin());
  },[dispatch, isDeleted])



  const columns = [
    { field: "id", headerName: "ID đơn hàng", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã giao hàng"
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
      headerName: "Cập nhật",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <StyledLink to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </StyledLink>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
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

  return (
    <Fragment>
      <MetaData title = "Tất cả đơn hàng (admin)" />
      <TopBar/>
      <div style={{display:"flex"}}>
        <SideBar/>
        <OrderListContainer>
        <ProductListHeading >Tất cả đơn hàng</ProductListHeading>
          <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
              />
        </OrderListContainer>
      </div>
    </Fragment>
  )
}

export default AdminOrderList