import React, { Fragment , useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import NewNavbar from '../components/NewNavbar'
import Slider from '../components/Slider'
import Loader from '../components/Loader'
import MetaData from '../components/MetaData'
import { Announcement } from '../components/Announcement'
import styled from '@emotion/styled'
import {getAllProducts} from '../redux/callAPI/productCall'
import ProductCard from '../components/ProductCard'

const SubTitle = styled.h2`
  text-align: center;
  font-family: Roboto;
  font-size: 1.4vmax;
  border-bottom: 1px solid rgba(21, 21, 21, 0.5);
  width: 20vmax;
  padding: 1vmax;
  margin: 5vmax auto;
  color: rgb(0, 0, 0, 0.7);
`

const ListImage = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0 5vmax;
    justify-content: center;
    min-height: 30vh;

`

const Home = () => {
  const { products, isLoading} = useSelector((state)=>state.products)
  const dispatch = useDispatch()
  const [role, setRole] = useState("newProduct")


  useEffect(()=>{
    dispatch(getAllProducts({role}))
  },[dispatch, role])
   


  return (
    <Fragment>
        <MetaData title="Shibamasi Shop"/>
          <NewNavbar/>
          <Announcement/>
          <Slider/>
          <Categories/>
          <SubTitle>Sản phẩm mới</SubTitle>
          {isLoading ? <Loader/>: (
            <ListImage>
              {products && products.map((product)=>(
                  <ProductCard key={product._id} product={product} />
              ))}
            </ListImage>
           ) }  
          <Footer/>
    </Fragment>
  )
}

export default Home