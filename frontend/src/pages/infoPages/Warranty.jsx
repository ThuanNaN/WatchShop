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

const Desc = styled.h2`
  font-size: 16px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 40px;
  padding: 40px;
`;
const Slide = styled.div`
  width: 80vw;
  height: 80vh;
  display: flex;
`;

const AboutUs = () => {
  return (
    <Container>
      <MetaDate title = "Chính sách bảo hành" />
      <NewNavbar/>
      <Title>CHÍNH SÁCH BẢO HÀNH</Title>
      <Wrapper>
        <Slide>
          <ImgContainer>
            <Image src="https://gomsuthanhluong.com/wp-content/uploads/2021/02/chinh-sach-bao-hanh-tai-bep-hoang-cuong.jpg"/>
          </ImgContainer>
          <InfoContainer>
            <Desc>
            - <b>Bảo hành 10 năm</b> đối với những lỗi từ nhà sản xuất. <br/>
            - <b>Bảo hành miễn phí (1 lần) trong 1 năm đầu tiên</b> với những lỗi người dùng như: vỡ, nứt kính, hấp hơi nước, va đập mạnh, tai nạn dẫn đến rơi linh kiện bên trong mặt đồng hồ,...<br/>
            - <b>Thay pin miễn phí trọn đời.</b> <br/> <br/> 
              Chính sách bảo hành <b>KHÔNG</b> được áp dụng với: <br/>
            - Vòng tay, nhẫn và dây đồng hồ. <br/>
            - Sản phẩm xuống màu sau một thời gian dài sử dụng. <br/>
            - Va đạp mạnh gây biến dạng khung đồng hồ. <br/> <br/> 
              Để được bảo hành sản phẩm, bạn có thể lựa chọn những hình thức sau: <br/>
            - Mang trực tiếp đến Cửa hàng gần nhất của Shibamasi để nhân viên Tư vấn có thể thẩm định và tiếp nhận Bảo hành. <br/>
            - Gửi thông tin cho chúng tôi bao gồm: Họ, Tên, Thời gian mua hàng và Tình trạng sản phẩm (kèm theo ảnh mô tả nếu có) về địa chỉ Email: <b>cskh@shibamasi.com</b> hoặc <b>Fanpage chính thức</b> của Shibamasi.
            </Desc>
          </InfoContainer>
        </Slide>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default AboutUs