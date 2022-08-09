import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'


const Container =  styled.div`
    display: flex;
    padding: 1vmax;
    height: 8vmax;
    align-items: flex-start;
    box-sizing: border-box;
`

const Image = styled.img`
    width: 7vmax;
    &:hover {
        background-color: rgba(40, 30, 30, 0.2);
      }
`

const CardInfo = styled.div`

    display: flex;
    flex-direction: column;
    margin: 0.3vmax 1vmax;
    width: 30vmax;
`

const ProductName = styled.p`

`

const Price = styled.p`

`
const ButtonRemove = styled.button`
    cursor:pointer;
    width: 10vmax;
    &:hover {
        background-color: rgba(20, 30, 30, 0.2);
      }
`


const CardItem = ({item, removeCartItem}) => {

  return (
    <Fragment>
        <Container>
            <Link to={`/product/${item.product}`} >
                <Image src={item.image} />
            </Link>
            
            <CardInfo>
             
                <ProductName>Tên sản phẩm: {item.name}</ProductName>
         
                <Price>
                    {`Giá: ${item.price} VND`}
                </Price>

                <ButtonRemove onClick={() => removeCartItem(item.product)}>Remove</ButtonRemove>
            </CardInfo>
        </Container>
    </Fragment>
  )
}

export default CardItem