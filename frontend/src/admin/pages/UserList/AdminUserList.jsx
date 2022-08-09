import styled from "@emotion/styled";
import SideBar from "../../components/sidebar/SideBar";
import TopBar from "../../components/topbar/TopBar";
import { DataGrid } from '@mui/x-data-grid';
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {getAllUser} from '../../../redux/callAPI/userCall'
import { useNavigate, Link } from "react-router-dom";
import {GetAllUserSlice, ProfileSlice} from '../../../redux/Slice/userSlice'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteUser} from '../../../redux/callAPI/userCall'
import MetaData from "../../../components/MetaData";


const ProductListHeading = styled.h1`
  font: 400 2rem "Roboto";
  padding: 0.5vmax;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.637);
  transition: all 0.5s;
  margin: 2rem;
  text-align: center;
`

const UserListContainer = styled.div`
    flex: 4;
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

export default function UserList() {
    const history = useNavigate()
    const dispatch = useDispatch();
    const {users, isLoading, error} = useSelector(state => state.allUser)
    const { isDeleted, isLoading: DeleteLoading, error: deleteError } = useSelector((state) => state.userProfile);

    const deleteUserHandler = (id) => {
      dispatch(deleteUser(id))
    }

    useEffect(()=>{
      if (error){
        alert("Lỗi !")
        dispatch(GetAllUserSlice.actions.clearErr())
      }
      if (deleteError){
        alert("Lỗi !")
        dispatch(ProfileSlice.actions.clearErr())
      }
      if (isDeleted){
        alert("Đã xóa thành công !")
        dispatch(ProfileSlice.actions.deleteProfileReset())
        history("/admin/users")
      }

      dispatch(getAllUser())
    }, [dispatch,isDeleted,error,deleteError])


    const columns = [
      { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
  
      {
        field: "email",
        headerName: "Email",
        minWidth: 200,
        flex: 1,
      },
      {
        field: "name",
        headerName: "Tên",
        minWidth: 150,
        flex: 0.5,
      },
  
      {
        field: "role",
        headerName: "Role",
        type: "number",
        minWidth: 150,
        flex: 0.3,
        cellClassName: (params) => {
          return params.getValue(params.id, "role") === "admin"
            ? "greenColor"
            : "redColor";
        },
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
              <StyledLink to={`/admin/user/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </StyledLink>
  
              <Button
                onClick={() =>
                  deleteUserHandler(params.getValue(params.id, "id"))
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
  
    users &&
      users.forEach((item) => {
        rows.push({
          id: item._id,
          role: item.role,
          email: item.email,
          name: item.name,
        });
      });



    return (
      <Fragment>
        <MetaData title= "Tất cả tài khoản (admin)"/>
        <TopBar/>
        <div style={{display:"flex"}}>
          <SideBar/>
          <UserListContainer>
          <ProductListHeading >Tất cả người dùng</ProductListHeading>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </UserListContainer>
        </div>
      </Fragment>
    )
}
