import React, { Fragment, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Loader from '../../components/Loader'
import MetaData from '../../components/MetaData'
import NewNavbar from '../../components/NewNavbar'
import { useDispatch, useSelector } from 'react-redux'
import {updatePassword} from '../../redux/callAPI/userCall'
import { useNavigate } from 'react-router-dom'
import {ProfileSlice} from '../../redux/Slice/userSlice'
import Footer from '../../components/Footer'
import { logout } from '../../redux/callAPI/userCall'


const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  background: #DCDCDC;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: 1.5px solid black;
  border-radius: 25px;
  font-size: 14px;
`;
const Form = styled.form`

`
const Title = styled.h1`
  font-size: 35px;
  font-weight: 300;
`;

const Button = styled.button`
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border: 2px solid teal;
  border-radius: 15px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;




const UpdatePassword = () => {

    const {isLoading, isUpdated, error} = useSelector((state)=>state.userProfile)  
    const dispatch = useDispatch();
    const history = useNavigate();

    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmNewPassqord] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(updatePassword({oldPassword, newPassword, confirmPassword}))
    }

    useEffect(()=>{
        if (error){
            alert("Lỗi !")
            dispatch(ProfileSlice.actions.clearErr());
        }
        if(isUpdated){
            alert("Cập nhật mật khẩu thành công !")
            dispatch(ProfileSlice.actions.updateProfileReset());
            dispatch(logout())
            history("/login")
            
        }
        
    }, [isUpdated,dispatch,history,error])


  return (
    <Fragment>
        {isLoading ? 
        (
            <Loader/>
        )
        :
        (
            <Fragment>
                <MetaData title={"Đổi mật khẩu"}/>
                <div style={{position:"fixed", width:"100%"}}>
                 <NewNavbar/>  
                </div>
                <Container>
                    <Wrapper>    
                    <Title>ĐỔI MẬT KHẨU</Title>
                    <Form>
                        <h6>Mật khẩu hiện tại</h6>
                        <Input 
                          type="password"
                          onChange={(e)=>setoldPassword(e.target.value)} 
                        />
                
                        <h6>Mật khẩu mới</h6>
                        <Input  
                          type="password" 
                          onChange={(e)=>setNewPassword(e.target.value)} 
                        />

                        <h6>Xác nhận mật khẩu mới</h6>
                        <Input 
                          type="password" 
                          onChange={(e)=>setConfirmNewPassqord(e.target.value)} 
                        />

                        <br></br>
                        <Button  onClick={handleClick}>Cập nhật</Button>
                    </Form>
                    </Wrapper>
                </Container>
            </Fragment>
        )}
    <Footer/>
    </Fragment>
  )
}

export default UpdatePassword