import React, { Fragment, useEffect, useState} from 'react'
import styled from '@emotion/styled'
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../../redux/callAPI/userCall';
import { Link , useNavigate, useLocation} from 'react-router-dom';
import {mobile} from "../../responsive";
import NewNavbar from '../../components/NewNavbar';
import Footer from '../../components/Footer';

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
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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

const StyledLink = styled(Link)`
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  &:focus, &:hover, &:visited, &:link {
    color:black;
    text-decoration: none;
  }
`

const LoginSuccess = styled.div`
  text-align: center;
  padding:20px;
  height:200px;
`

const TitleSuccess = styled.h1`
  font-size: 30px;
  font-weight: 500;
`;


const Login = () => {
  
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const {isLoading, error, isAuthenticated} = useSelector(state=>state.user)

  const [email,setEmail] = useState("")
  const [password, setPassword]  = useState("");

  const handleClick = (e) =>{
    e.preventDefault();
    dispatch(login({email,password}));
  }


  // useEffect(()=>{
    
  //   if (isAuthenticated){
  //     history(redirect);
  //   }
  // },[dispatch,history,isAuthenticated,redirect])

  const backHome = () => {
    history('/');
  }

  return (
    <Fragment>
      <div style={{position:"fixed", width:"100%"}}>
        <NewNavbar/>  
      </div>
      {isAuthenticated ? 
      (
        <Container>
            <LoginSuccess>
              <TitleSuccess>????NG NH???P TH??NH C??NG</TitleSuccess>
              <Button onClick={backHome}>Trang ch???</Button>
            </LoginSuccess>
        </Container> 
      )
      :
      (  
        <Container>
          <Wrapper>
            <Title>????NG NH???P</Title>
            <Form>
              <Input
                name = "email"
                type="email"
                placeholder='Email'
                onChange={(e)=>setEmail(e.target.value)}
              />

              <Input 
                name='password'
                type="password"
                placeholder='M???t kh???u'
                onChange={(e)=>setPassword(e.target.value)}
              />
    
              <Button onClick={handleClick}>????ng nh???p</Button>
              
              {error ? 
                (<p style={{color:"red"}}>L???i! Vui l??ng th??? l???i</p>)
                :
                (<p style={{color:"white"}}>No error</p>)}

            </Form>

            <StyledLink to={`/password/forgot`}>Qu??n m???t kh???u?</StyledLink>
            &nbsp;
            <Link to={`/register`}>????ng k?? t??i kho???n</Link>
          </Wrapper>
        </Container>
      )} 
    <Footer/>
    </Fragment>
  )
}

export default Login