import React from 'react'
import styled from '@emotion/styled'
import { mobile } from "../responsive";
import  { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;
  

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    font-size:50px;
    margin-bottom: 20px;
`;

const Button = styled.button`
  border:none;
  padding: 10px;
  background-color: white;
  color:gray;
  cursor: pointer;
  font-weight: 800;
  &:hover{
    background-color: #e9f5ff;
    transform: scale(1.1);
  }
`;

const CategoryItems = ({item}) => {
  return (
    <Container>
      <Link to = {`/products/${item.cat}`}>
        <Image src = {item.img}/>
          <Info>
              <Title>
                  {item.title}
              </Title>
              <Button>
                  MUA NGAY
              </Button>
          </Info>
      </Link>
       
    </Container>
  );
};

export default CategoryItems