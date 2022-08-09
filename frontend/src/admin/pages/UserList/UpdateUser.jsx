import React, { Fragment, useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import TopBar from '../../components/topbar/TopBar'
import styled from '@emotion/styled'
import SideBar from '../../components/sidebar/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import {getUserDetailAdmin} from '../../../redux/callAPI/userCall'
import {GetUserDetailSlice, ProfileSlice} from '../../../redux/Slice/userSlice'
import Loader from '../../../components/Loader'
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import {updateUserRole} from '../../../redux/callAPI/userCall'
import Button from '@mui/material/Button';

const UpdateUserContainer = styled.div`
    flex:4;
    padding: 20px;
    
`
const UpdateForm = styled.form`
    width: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const InputContainer = styled.div`
    padding: 10px;
`

const Input = styled.input`
    width: 300px;
`

const Select = styled.select`
    width: 300px;
`

// const Button = styled.button`
//     text-align: center;
// `

const UpdateUser = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { isLoading, error, user } = useSelector((state) => state.userDetail);
    const { isUpdated, isLoading: UpdateLoading, error: updateError } = useSelector((state) => state.userProfile);

    const userId = location.pathname.split("/")[3];

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");


    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserRole([userId,{name,email,role}]))
    }

    useEffect(()=>{
        if (user && user._id !== userId){
            dispatch(getUserDetailAdmin(userId))
        }
        else{
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if (error){
            alert("Lỗi !")
            dispatch(GetUserDetailSlice.actions.clearErr())
        }
        if (updateError){
            alert("Lỗi !")
            dispatch(ProfileSlice.actions.clearErr())
        }
        if (isUpdated){
            alert("Cập nhật role thành công !")
            dispatch(ProfileSlice.actions.updateProfileReset())
            history("/admin/users") 
        }

    }, [dispatch, error,updateError, user,userId,history,isUpdated])

  return (
    <Fragment>
        <TopBar/>
        <div style={{display:"flex"}}>
            <SideBar/>
            <UpdateUserContainer>
                {isLoading ? <Loader/>: (
                    <Fragment>
                        <h2>Cập nhật User</h2>
                        <UpdateForm
                            onSubmit={updateUserSubmitHandler}
                            >
                            
                            <InputContainer>
                                <PersonIcon />
                                <Input
                                type="text"
                                placeholder="Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                />
                            </InputContainer>

                            <InputContainer>
                                <MailOutlineOutlinedIcon />
                                <Input
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </InputContainer>

                            <InputContainer>
                                <VerifiedUserIcon />
                                <Select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </Select>
                            </InputContainer>

                            {/* <Button
                                id="createProductBtn"
                                type="submit"
                                // disabled={
                                // updateLoading ? true : false || role === "" ? true : false
                                // }
                            >
                                Update
                            </Button> */}
                            <Button variant="contained" type='submit'>Cập nhật</Button>
                        </UpdateForm>
                    </Fragment>
                )}
            </UpdateUserContainer>
        </div>
    </Fragment>
  )
}

export default UpdateUser