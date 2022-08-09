import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../components/Footer'
import NewNavbar from '../../components/NewNavbar'
import styled from "styled-components"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel';
import { Announcement } from '../../components/Announcement'
import {getAllProducts} from '../../redux/callAPI/productCall'
import ProductCard from '../../components/ProductCard'
import { useLocation } from 'react-router-dom'
import MetaData from '../../components/MetaData'
import ReactPaginate from 'react-paginate';
import './ProductList.css'

const Container = styled.div`

`

const Title = styled.h1`
  margin: 20px;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Filter  = styled.div`
  margin: 20px;  
`

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`

const ListImage = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0 5vmax;
    justify-content: center;
    min-height: 30vh;
`
const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 6vmax;
`

const ProductList = () => {

  const { products, isLoading, resultPerPage} = useSelector((state)=>state.products)
  const dispatch = useDispatch()
  const location = useLocation();
  
  
  const [title, setTitle] = useState("Tất cả sản phẩm");
  // const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [strap, setStrap] = useState("");
  const [sortType, setSortType] = useState("newest");

  const [role, setRole] = useState("category");
  const [keyword,setKeyword] = useState("");



  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(()=>{
    const endOffset = itemOffset + resultPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / resultPerPage));
  },[itemOffset, resultPerPage, currentItems])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * resultPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };


  
  let category = ""
  useEffect(()=>{
    // if(error){
    //   alert("Lỗi !")
    //   dispatch(productsSlide.actions.clearError());
    // }

  
      if (location.pathname.split("/").length > 2) {
        category = location.pathname.split("/")[2]
        if (category === "phukien"){
          setTitle("Phụ kiện");
          // setStrap("phukien");
        }
        else if (category === "nu") {
          setTitle("Đồng hồ nữ")
          // setCategory("nu");
        }
        else if (category === "nam") {
          setTitle("Đồng hồ nam")
          // setCategory("nam")
        }
        else{
          setKeyword(category)
          setRole("search")
        }
      }
  

    dispatch(getAllProducts({role, color, strap, sortType, keyword, category}))
    
  },[dispatch ,role,  location,  strap, color, sortType, keyword ])

  
  return (
    <Container>
      <MetaData title={title}/>
      <NewNavbar/>
      <Announcement/>
      <Title>
        Bộ lọc
      </Title>
      <FilterContainer>
        <Filter>
          <FilterText>
            Lọc sản phẩm:
          </FilterText>

          <FormControl variant="filled" sx={{ m: -1, minWidth: 120, marginRight: '20px'}}>
            <InputLabel id="color-select-disabled-label" disabled>Màu sắc</InputLabel>
            <Select
              labelId='color-select-disabled-label'
              id='color-select-disabled-label'
              value={color}
              label="color"
              onChange={(e)=>setColor(e.target.value)}
              // onChange={handleChangeColor}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value={'black'}>Đen</MenuItem>
              <MenuItem value={'white'}>Trắng</MenuItem>
              <MenuItem value={'brown'}>Nâu</MenuItem>
              <MenuItem value={'yellow'}>Vàng</MenuItem>
              <MenuItem value={'silver'}>Bạc</MenuItem>
              <MenuItem value={'blue'}>Xanh dương</MenuItem>
              <MenuItem value={'navy'}>Navy</MenuItem>
              <MenuItem value={'pink'}>Hồng</MenuItem>
            </Select>
          </FormControl> 

          <FormControl variant="filled" sx={{ m: -1, minWidth: 120, marginRight: '20px'}}>
            <InputLabel id="strap-select-disabled-label" disabled>Loại dây</InputLabel>
            <Select
              labelId='strap-select-disabled-label'
              id='strap-select-disabled-label'
              value={strap}
              label="strap"
              onChange={(e) => setStrap(e.target.value)}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value={'kim loại'}>Kim loại</MenuItem>
              <MenuItem value={'da'}>Da</MenuItem>
              <MenuItem value={'phukien'}>Phụ kiện</MenuItem>
            </Select>
          </FormControl> 


        </Filter>
        <Filter>
          <FilterText>
            Sắp xếp:
          </FilterText>
          <FormControl variant="filled" sx={{ m: -1, minWidth: 150, marginRight: '20px'}}>
            <InputLabel id="sort-select-disabled-label" disabled>Kiểu sắp xếp</InputLabel>
            <Select
              labelId='sort-select-disabled-label'
              id='sort-select-disabled-label'
              value={sortType}
              label="sortType"
              onChange={(e) => setSortType(e.target.value)}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value={'newest'}>Mới nhất</MenuItem>
              <MenuItem value={'price-asc'}>Giá (tăng dần)</MenuItem>
              <MenuItem value={'price-desc'}>Giá (giảm dần)</MenuItem>
            </Select>
          </FormControl> 
        </Filter>
      </FilterContainer>


        <ListImage>
          {currentItems && currentItems.map((product)=>(
                        <ProductCard key={product._id} product={product} />
                    ))}
        </ListImage>
        
        <PaginationBox>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Tiếp >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< Trước"
            renderOnZeroPageCount={null}
            containerClassName = "PaginationContainer"
            pageClassName = "PaginationPage"
            previousClassName = "PaginationPreviousNext"
            nextClassName = "PaginationPreviousNext"
            activeLinkClassName = "OnPage"
          />
        </PaginationBox>
        

      <Footer/>
    </Container>
  )
}

export default ProductList