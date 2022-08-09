import React, { Fragment, useEffect, useState} from 'react'
import { mobile } from "../../responsive";
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../components/Loader'
import {getProductDetail} from '../../redux/callAPI/productCall'
import { useLocation, useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import { Add, Remove } from "@mui/icons-material";
import NewNavbar from '../../components/NewNavbar'
import Footer from '../../components/Footer'
import {addItemToCart} from '../../redux/callAPI/cartCall'
import MetaData from '../../components/MetaData'
import {productSlice} from '../../redux/Slice/productSlice'

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    align-items: center;
    width: 100wh;
    height: 90vh;
    ${mobile({ padding: "10px", flexDirection:"column" })}
    background-color: #DCDCDC;
`;


const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 80%;
    height: 80%;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
    display: block;
    flex: 1;
    text-align: center;
    ${mobile({ padding: "10px" })}
    background-color: white;
`;

const ProductBrand = styled.h6`
  text-transform: uppercase;
  text-align: center;
  color: #A9A9A9;
  font-size: 15px;
`;

const ProductName = styled.h1`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 30px;
`;

const Desc = styled.div`
    padding-left: 15px;
    padding-right: 15px;
`;

const Price = styled.span`
    font-weight: bold;
    font-size: 25px;
`;

const PriceFake = styled.span`
    font-size: 15px;
    color: #A9A9A9;
    text-decoration-line: line-through;
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
    padding-left: 15px;
`;

const FilterTitle = styled.span`
    width: max-content;
    text-transform: capitalize;
`;

const AddContainer =  styled.div`
    width: 100%;
    display: block;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    margin-left: 20px;
    &:hover{    
        background-color: #f8f4f4;
    }
`;


const ProductDetail = () => {

  const location = useLocation();
  const navigate = useNavigate()
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch(); 

  const { product, error } = useSelector((state) => state.product);
  const {currentUser} = useSelector((state)=>state.user)
  const [quantity, setQuantity] = useState(1);

  // chỉnh giới hạn <= stock
  const handleQuantity = (type) => {
    if (type === "dec") {
      if(1 >= quantity) return;
      setQuantity(quantity - 1);

    } else {
      if (product.stock <= quantity) return;
      setQuantity(quantity + 1);
    }
    };

    const handleClickAdd2Cart = (e)=>{
      e.preventDefault();
      if (currentUser){
        dispatch(addItemToCart([id,quantity]))
        alert("Thêm thành công")
      }
      else{
        alert("Vui lòng đăng nhập !")
        navigate("/login")
      }
     
    }

  useEffect(()=>{
    if(error){
      alert("Lỗi !")
      dispatch(productSlice.actions.clearError())
    }

    dispatch(getProductDetail(id))
  },[dispatch,error,id])


  return (
    <Fragment>
      <MetaData title = "Chi tiết sản phẩm" />
      <NewNavbar/>
      {(!product)  ? <Loader/>:(<Fragment>

        <Wrapper> 
          
          <ImgContainer>
            <Image src={product.image}/>
          </ImgContainer>

          <InfoContainer>
            <ProductBrand>{product.brand}</ProductBrand>
            <ProductName>{product.name}</ProductName>
            <Desc>{product.description}</Desc>
            <PriceFake>{(product.price*1.2).toLocaleString()} đ</PriceFake><br/>
            <Price>{(product.price).toLocaleString()} đ</Price>

            <FilterContainer>
              <Filter> <b>Thông tin chi tiết sản phẩm</b></Filter>
              <Filter>
                <FilterTitle>Hãng sản xuất - {product.brand} </FilterTitle>
              </Filter>
              <Filter>
                <FilterTitle>Tên - {product.name} </FilterTitle>
              </Filter>
              <Filter>
                <FilterTitle>Màu: {product.color} </FilterTitle>
              </Filter>
              
              <Filter>
                <FilterTitle> Dây đeo: {product.strap}</FilterTitle>
              </Filter>
              <Filter>
                  <FilterTitle>Kho: {product.stock}</FilterTitle>
              </Filter>
            </FilterContainer>

            <AddContainer>
              <AmountContainer>
                <Desc>Số lượng:</Desc>
                <Remove onClick={() => handleQuantity("dec")} />
                <Amount>{quantity}</Amount>
                <Add onClick={() => handleQuantity("inc")} />
              </AmountContainer>
              <Button onClick={handleClickAdd2Cart} >Thêm vào giỏ hàng</Button>
            </AddContainer>

          </InfoContainer>
        </Wrapper>

      </Fragment>)}
      <Footer/>
    </Fragment>
  )
}

export default ProductDetail