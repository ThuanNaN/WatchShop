import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'


import Loader from '../../components/Loader'
import MetaData from '../../components/MetaData'
import NewNavbar from '../../components/NewNavbar'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'


const Container = styled.div`
  background: #DCDCDC;
`;
const Wrapper = styled.div`
  display: flex;
`;
const ImgContainer = styled.div`
  height: 80%;
  widht: 100%;
  flex: 1;
`;
const Image = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;
const InfoContainer = styled.div`
  flex: 1;
  display: block;
  text-align: center;
  margin: auto;
`;
const Desctitle = styled.h4`
  padding: 10px;
`;
const Desc = styled.h2`
  font-size: 25px;
`;
const Title = styled.h1`
  padding: 20px;
  text-align: center;
  font-size: 35px;
`;
const Logo = styled.h1`
  margin: 10px
`;
const Slide = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  align-items: center;
`;
const Account = () => {

  const {currentUser, isLoading, isAuthenticated } = useSelector((state)=>state.user)

  const history = useNavigate();

  useEffect(()=>{
    if(!isAuthenticated){
      history("/")
    }
  },[history, isAuthenticated])

  return (
    <Fragment>
      {isLoading ? (
        <Loader/>
      ) : (
        
        <Fragment>
          {isAuthenticated?(
            <Fragment>
            <MetaData title = {currentUser.name}/>
            <NewNavbar/>
            <Title>THÔNG TIN NGƯỜI DÙNG</Title>
            <Container>
              <Wrapper>
              <Slide>
                  <InfoContainer>
                    <Desctitle>Họ và tên</Desctitle>
                    <desc>{currentUser.name}</desc>          
                    <Desctitle>Email</Desctitle>
                    <desc>{currentUser.email}</desc> <br/>
                    <Link to = "/me/update">Thay đổi thông tin</Link> <br/>
                    <Link to = "/password/update"> Đổi mật khẩu </Link> <br/>
                  </InfoContainer>
                  <ImgContainer>
                    <Image src={currentUser.avatar}/>
                  </ImgContainer>
                </Slide>
              </Wrapper>
            </Container>
          </Fragment>
          ):(
            <></>
          )}
        <Footer/>
        </Fragment>

        

      )}

         
    </Fragment>
    
  )
}

export default Account