import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import MetaData from '../../components/MetaData'
import styled from '@emotion/styled'
import NewNavbar from '../../components/NewNavbar'
import Footer from '../../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import {forgotPassword} from '../../redux/callAPI/userCall'
import {ForgotPasswordSlice} from '../../redux/Slice/userSlice'
import { useNavigate } from 'react-router-dom'

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
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 500;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction:column;
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: 1.5px solid black;
  border-radius: 25px;
  font-size: 14px;
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
const Link = styled.a`
  margin: 5px 0px;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
`;


export const ForgotPassword = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const  {isLoading, error, message }= useSelector((state)=>state.forgotPassword) 
    
    const [email, setEmail] = useState("");
    
    const handleClick = (e)=>{
        e.preventDefault();
        dispatch(forgotPassword({email}))
    }

    useEffect(()=>{
        if (error){
            alert("Lỗi !");
            dispatch(ForgotPasswordSlice.actions.clearErr());
        }
        if (message){
            alert(message)
            dispatch(ForgotPasswordSlice.actions.clearMessage());
            history("/")
        }

    },[error, dispatch, message])

  return (
      <Fragment>
        <div style={{position:"fixed", width:"100%"}}>
        <NewNavbar/>  
        </div>
          <MetaData title="Quên mật khẩu" />
          {isLoading ? (<Loader/>):(
            <Fragment>
                <Container>
                    <Wrapper>
                    <Title>Quên mật khẩu</Title>
                    <Form>
                        <Input 
                            placeholder='Email'
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <Button onClick={handleClick}> Gửi </Button>
                    </Form>
                    </Wrapper>
                </Container>  
            </Fragment>

          )} 
        <Footer/>
      </Fragment>
    
  )
}
export default ForgotPassword 