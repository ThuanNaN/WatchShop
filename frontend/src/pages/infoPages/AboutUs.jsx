import React from 'react'
import styled from '@emotion/styled'
import Footer from '../../components/Footer'
import NewNavbar from '../../components/NewNavbar'
import MetaDate from '../../components/MetaData'

const Container = styled.div`
  background-color: #DCDCDC;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.2s ease;
  transform: translateX(${props => props.slideIndex* -100}vw);
`;


const ImgContainer = styled.div`

  height: 65%;
  widht: 65%;
  flex: 1;
  text-align:center;
  padding: 30px;
`;

const Image = styled.img`
  height: 80%
`;

const InfoContainer = styled.div`
  flex: 1;
  text-align: center;
  width: 75%;
`;

const Desctitle = styled.h1`
  font-size: 30px;
  padding: 10px;
  font-weight: bold;
`;

const Desc = styled.h2`
  font-size: 25px;
  width: ${props => props.width}%;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 40px;
`;
const Logo = styled.h1`
  margin: 10px
`;
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const AboutUs = () => {
  return (
    <Container>
      <MetaDate title = "Về chúng tôi" />
      <NewNavbar/>
      <Wrapper>
        <Slide>
          <ImgContainer>
            <Image src="https://blog.curnonwatch.com/wp-content/uploads/2021/05/mau-dong-ho-nam-ban-chay-1.jpg"/>
          </ImgContainer>
          <InfoContainer>
            <Desctitle> CHÀO MỪNG ĐẾN VỚI THẾ GIỚI <Logo>SHISI WATCH</Logo> NƠI MỖI CHIẾC ĐỒNG HỒ MANG CÁ TÍNH RIÊNG CỦA BẠN </Desctitle>
          </InfoContainer>
        </Slide>
      </Wrapper>
      <Title>NHÀ SÁNG LẬP</Title>
      <Wrapper>
        <Slide>
          <ImgContainer>
            <Image src="https://scontent.fhan4-3.fna.fbcdn.net/v/t1.15752-9/275496877_2392723590880343_2965477215667845821_n.jpg?_nc_cat=103&ccb=1-6&_nc_sid=ae9488&_nc_ohc=W-9OMaOWS-gAX_-D-Ih&_nc_ht=scontent.fhan4-3.fna&oh=03_AVLmmkafRzTBY_J_IOtjoCWwgqv3Iq-VpYyE-vOdQdH8HA&oe=62AC5517"/>
          </ImgContainer>
          <ImgContainer>
            <Image src="https://www.uit.edu.vn/sites/vi/files/images/Logos/Logo_UIT_Web_Transparent.png"/>
          </ImgContainer>
          <InfoContainer>
            <Desc width='75'><Logo>Shibamasi</Logo> Được thành lập bởi những bạn trẻ tại UIT - Những còn người mang niềm đam mê giao thoa giữa công nghệ và đồng hồ với khát vọng vươn ra toàn cầu.</Desc>
          </InfoContainer>
        </Slide>
      </Wrapper>
      <Wrapper>
        <Slide style={{ padding:"30px"}}>
          <InfoContainer style={{padiing:"30px"}}>
            <Title>GIÁ TRỊ CỐT LÕI</Title>
            <Desc> Tương tự như Jobs, chúng tôi tin rằng mỗi con người khi sinh ra đều có một câu chuyện riêng, những nét đặc trưng riêng. 
            Tại đây mỗi chiếc đồng hồ sẽ được thiết kế sao cho mang hết những nét đặc trưng mà chủ nhân của nó sở hữu. Chúng tôi muốn truyền 
            tải đến mọi người một thông điệp: "Hãy tư duy khác biệt, vì mỗi chúng ta là cá thể riêng biệt".
            </Desc>
          </InfoContainer>
          <ImgContainer>
            <Image style={{width:"100%", height:"100%"}} src="https://cdnmedia.baotintuc.vn/Upload/0gYjdiNY41wQIbPeRYyPvA/files/2021/10/Steve-Jobs/steve-jobs_quote.jpg"/>
          </ImgContainer>
        </Slide>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default AboutUs