import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import NewNavbar from '../../components/NewNavbar'
import MetaData from '../../components/MetaData'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import {resetPassword} from '../../redux/callAPI/userCall'
import {ForgotPasswordSlice} from '../../redux/Slice/userSlice'
import Footer from '../../components/Footer'

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
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: 500;
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



const ResetPassword = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation()
    const token = location.pathname.split("/")[3]

    const  {isLoading, error, message, success }= useSelector((state)=>state.forgotPassword) 

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleClick = (e)=>{
        e.preventDefault();
        dispatch(resetPassword([token,{password,confirmPassword}]));
    }

    useEffect(()=>{
        if (error){
            alert("Lỗi !");
            dispatch(ForgotPasswordSlice.actions.clearErr());
        }
        if (message){
            alert(message)
            dispatch(ForgotPasswordSlice.actions.clearMessage());
        }
        if (success){
          alert("Cập nhật mật khẩu mới thành công")
          dispatch(ForgotPasswordSlice.actions.clearSuccess());
          history("/login")
        }
    },[dispatch,error,message, success, history])

    return (
        <Fragment>
            <MetaData title="Đặt lại mật khẩu"/>
            <div style={{position:"fixed", width:"100%"}}>
                <NewNavbar/>  
            </div>
            {isLoading ? (<Loader/>):(
                <Fragment>
                    <Container>
                        <Wrapper>
                            <Form>
                                <Title>Đặt lại mật khẩu</Title>
                                <Input
                                name='password'
                                placeholder='Mật khẩu'
                                type='password'
                                onChange={(e)=>setPassword(e.target.value)}
                                />
                                <Input
                                name = 'confirmPassword'
                                type='password'
                                placeholder='Xác nhận mật khẩu'
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                                />
                                <Button onClick={handleClick}>Xác nhận</Button>
                            </Form>
                        </Wrapper>
                    </Container>
                </Fragment>
            )}

        <Footer/>
        </Fragment>


  )
}

export default ResetPassword