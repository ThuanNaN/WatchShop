import React, { Fragment, useEffect } from 'react'
import SideBar from '../../components/sidebar/SideBar'
import TopBar from '../../components/topbar/TopBar'
import styled from '@emotion/styled'
import {useDispatch, useSelector} from 'react-redux'
import {getProductAdmin, deleteProduct} from '../../../redux/callAPI/productCall'
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {updateDeleteProductSlice,productsSlide} from '../../../redux/Slice/productSlice'
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

const ProductListContainer = styled.div`
  flex:4;
  padding: 20px;
`
const Button = styled.button`
    &:hover{
      background-color:red;
    }
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

const AdminProductList = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const {products, error} = useSelector((state)=>state.products)
  const {isDeleted, error: deleteError} = useSelector((state)=>state.updateDeleteProduct)

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
  }

  useEffect(()=>{
    if (error){
      alert("Lỗi !")
      dispatch(productsSlide.actions.clearError());
    }
    if (deleteError){
      alert("Lỗi !")
      dispatch(updateDeleteProductSlice.actions.clearErr());
    }

    if (isDeleted){
      alert("Xóa thành công !")
      dispatch(updateDeleteProductSlice.actions.deleteProuctReset())
      history("/admin/products");
    }

    dispatch(getProductAdmin())
  },[dispatch, history,error,isDeleted ])
  


  const columns = [
    { field: "id", headerName: "ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Tên sản phẩm",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "brand",
      headerName: "Thương hiệu",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "category",
      headerName: "Phân loại",
      minWidth: 100,
      flex: 0.2,
    },

    {
      field: "stock",
      headerName: "Trong Kho",
      type: "number",
      minWidth: 100,
      flex: 0.2,
    },

    {
      field: "price",
      headerName: "Giá",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "discount",
      headerName: "Giảm giá (%)",
      type: "number",
      minWidth: 50,
      flex: 0.2,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <StyledLink to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </StyledLink>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        brand:item.brand,
        category: item.category,
        stock: item.stock,
        price: item.price,
        name: item.name,
        discount: item.discount,
      });
    });


  return (
    <Fragment>
      <MetaData title="Tất cả sản phẩm (admin)"/>
      <TopBar/>
      <div style={{display:"flex"}}>
        <SideBar/>
        <ProductListContainer>
          <ProductListHeading >Tất cả sản phẩm</ProductListHeading>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
        </ProductListContainer>
      </div>
    </Fragment>
  )
}

export default AdminProductList