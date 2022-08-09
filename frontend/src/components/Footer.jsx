import styled from "@emotion/styled"
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import RoomIcon from '@mui/icons-material/Room';
import MailIcon from '@mui/icons-material/Mail';
import { mobile } from "../responsive";
import {Link} from "react-router-dom"
import React from 'react'



const Container = styled.div`
    display: flex;
    background-color:	rgb(32,32,32);
    padding: 20px;
    color: white;
    ${mobile({ flexDirection: "column" })}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Logo = styled.h1`
  <link href="https://fonts.googleapis.com/css2?family=Koulen&family=Macondo&display=swap" rel="stylesheet">
  font-weight: bold;
  font-family: 'Macondo', cursive;
  cursor: pointer;
  ${mobile({ fontSize: "24px" })}
`;

const Desc = styled.p`
    margin: 20px 0px;
`
const SocialContainer = styled.div`
    display: flex;
`

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: ${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
`

const Title = styled.h3`
    margin-bottom: 30px;
`

const List = styled.ul`
  list-style: none;
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
`

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 20px;
  color: black;
`


const Right = styled.div`
    flex: 1;
    padding; 20px;
    ${mobile({ backgroundColor: "#fff8f8" })}
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items:center;
`

const Payment = styled.img`
    width:50%;
`


const SocialLogo = styled.a`
  color:white;
  cursor: pointer;
`
const StyledLink = styled(Link)`
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color:white;
  }
`

const Footer = () => {

  
  return (
    <Container>
      <Left>
        <Logo>Shibamasi</Logo>
        <Desc>
         Mô tả 
        </Desc>
        <SocialContainer>

          <SocialIcon color="blue">
            <SocialLogo href="https://www.facebook.com/" >
              <FacebookIcon />
            </SocialLogo>
          </SocialIcon>


          <SocialIcon color="#FD1D1D">
            <SocialLogo href="https://www.instagram.com/" >
              <InstagramIcon />
            </SocialLogo>
          </SocialIcon>
          
          <SocialIcon color="red">
            <SocialLogo href="https://youtube.com/" >
              <YouTubeIcon />
            </SocialLogo>
          </SocialIcon>


       
        </SocialContainer>
      </Left>
      <Center>
        {/* <Title>Useful Links</Title> */}
        <List>
          <ListItem> <StyledLink to = {`/`} >Trang chủ </StyledLink></ListItem>
          <ListItem><StyledLink to = {`/about-us`}>Về chúng tôi</StyledLink></ListItem>
          
          <ListItem><StyledLink to = {`/products/nam`} >Đồng hồ nam</StyledLink></ListItem>
          <ListItem><StyledLink to = {`/shipping-policy`}>Vận chuyển</StyledLink></ListItem>

          <ListItem><StyledLink to = {`/products/nu`}>Đồng hồ nữ</StyledLink></ListItem>
          <ListItem><StyledLink to = {`/warranty`}>Bảo hành</StyledLink></ListItem>
          
          <ListItem><StyledLink to = {`/products/phukien`}>Phụ kiện</StyledLink></ListItem>
          <ListItem><StyledLink to = {`/`}>Yêu thích</StyledLink></ListItem>

          <ListItem><StyledLink to = {`/cart`}>Giỏ hàng</StyledLink></ListItem>

        </List>
      </Center>
      <Right>
        <Title>Liên hệ</Title>
        <ContactItem>
          <RoomIcon style={{marginRight:"10px"}}/> Linh Trung, TP.Thủ Đức
        </ContactItem>
        <ContactItem>
          <PhoneIcon style={{marginRight:"10px"}}/> 0359890300
        </ContactItem>
        <ContactItem>
          <MailIcon style={{marginRight:"10px"}} /> duongthuan1445@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer