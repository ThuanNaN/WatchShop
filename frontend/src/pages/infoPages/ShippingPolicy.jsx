import React from 'react'
import styled from '@emotion/styled'
import Footer from '../../components/Footer'
import NewNavbar from '../../components/NewNavbar'
import MetaDate from '../../components/MetaData'


const Container = styled.div`
  background: #DCDCDC;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.2s ease;
  transform: translateX(${props => props.slideIndex* -100}vw);
`;


const ImgContainer = styled.div`
  height: 50%;
  widht: 50%;
  flex: 1;
  text-align:center;
  padding: 30px;
`;

const Image = styled.img`
  height: 80%
`;

const InfoContainer = styled.div`
  flex: 1;
  text-align: left;
  letter-spacing: 1px;
`;

const Desc = styled.h3`
  font-size: 15px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 40px;
  padding: 40px;
`;
const DesTitle = styled.h2`
  text-align: left;
  font-size: 30px;
`;
const Slide = styled.div`
  width: 80vw;
  height: 80vh;
  display: flex;
`;

const ShippingPolicy = () => {
  return (
    <Container>
      <MetaDate title = "Chính sách vận chuyển" />
      <NewNavbar/>
      <Title>CHÍNH SÁCH VẬN CHUYỂN</Title>
      <Wrapper>
        <Slide>
          <ImgContainer>
            <Image src="https://savasnutrition.com/wp-content/uploads/2021/08/chinh-sach-van-chuyen.png"/>
          </ImgContainer>
          <InfoContainer>
            <DesTitle>1. Vận chuyển tiêu chuẩn</DesTitle>
            <Desc>
              Phạm vi: Toàn quốc <br/>
              <ul>
                <li>Phí vận chuyển:</li>
                + Miễn phí vận chuyển với đơn hàng từ 700,000đ trở lên. <br/>
                + 30,000đ với đơn hàng có giá trị thấp hơn 700,000đ. <br/>
                <li>Thời gian vận chuyển:</li>
                + Nội thành Hà Nội: 1-2 ngày. <br/>
                + Miền Trung: 3-5 ngày. <br/>
                + Miền Nam: 5-7 ngày. <br/> 
              </ul>
            </Desc>
            <DesTitle>2. Chuyển phát nhanh</DesTitle>
            <Desc>
              Phạm vi: Nội thành Hà Nội và Hồ Chí Minh <br/>
              <ul>
                <li>Phí vận chuyển: Áp dụng thu theo mức giá tại thời điểm đặt ship.</li>
                <li>Thời gian vận chuyển: 1-2 tiếng kể từ thời gian báo vận chuyển.</li>
              </ul>
            </Desc>
          </InfoContainer>
        </Slide>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default ShippingPolicy