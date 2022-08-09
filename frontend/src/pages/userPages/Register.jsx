
import styled from "@emotion/styled";
import { mobile } from "../../responsive";
import React, { useEffect, useState } from "react";
import NewNavbar from "../../components/NewNavbar";
import {useDispatch, useSelector} from 'react-redux'
import { register } from "../../redux/callAPI/userCall";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import {UserSlice} from '../../redux/Slice/userSlice'

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
    ${mobile({ width: "75%" })}
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



const Register = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const {currentUser, registerSuccess} = useSelector(state => state.user)

    // const redirect = location.search ? location.search.split("=")[1] : "/login";

    const registerSubmit = (e) => {
        e.preventDefault();
        dispatch(register({name,email,password}));
    }    

    useEffect(()=>{
        if (registerSuccess){
            alert("Đăng ký thành công !")
            navigate("/login")
            dispatch(UserSlice.actions.clearRegisterSuccess())
        }

    }, [dispatch, navigate, registerSuccess])

    return (
        <>  
            <div style={{position:"fixed", width:"100%"}}>
            <NewNavbar/>  
            </div>
            <Container>
              
                <Wrapper>
                    <Title>ĐĂNG KÍ</Title>
                    <Form onSubmit={registerSubmit}>
                        <Input
                            placeholder="Tên"
                            type="text"
                            required
                            name="name"
                            onChange={(e)=>setName(e.target.value)}
                        />
                        <Input 
                            placeholder="Email" 
                            type='email'
                            required
                            name="email"
                            onChange={(e)=>setEmail(e.target.value)}
                        />

                        <Input 
                            placeholder="Mật khẩu"
                            type="password"
                            required
                            name="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        {/* <Input placeholder="Xác nhận mật khẩu"
                            type="password"
                            
                            onChange={registerDataChange}
                        />  */}

                        <Button type="submit">
                            Tạo tài khoản
                        </Button>
                    </Form>
                    <Link href="/login">Đăng nhập</Link>
                </Wrapper>
            </Container>
        <Footer/>
        </>
    )
}

export default Register