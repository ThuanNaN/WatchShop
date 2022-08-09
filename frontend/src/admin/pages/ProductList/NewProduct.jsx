import React ,{Fragment, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {newProductSlice} from '../../../redux/Slice/productSlice'
import {newProduct} from '../../../redux/callAPI/productCall'
import TopBar from '../../components/topbar/TopBar';
import SideBar from '../../components/sidebar/SideBar';
import styled from '@emotion/styled';
import MetaData from '../../../components/MetaData'
import StorageIcon from '@mui/icons-material/Storage';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CategoryIcon from '@mui/icons-material/Category';
import DiscountIcon from '@mui/icons-material/Discount';

const NewProductContainer = styled.div`
    flex:4;
    padding: 20px;
`
const Form = styled.form`

`

const Input = styled.input`
    width: 400px;
`

const Select = styled.select`
    width: 400px;
`

const TextArea = styled.textarea`
    width: 400px;
    height: 50px;
`

const NewProduct = () => {
    
    const dispatch = useDispatch();
    const history = useNavigate();

    const { isLoading, error, success } = useSelector(state => state.newProduct)

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");
    const [strap, setStrap] = useState("");
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState("");
    const [discount, setDiscount] = useState(0);

    const categories = [
        "nam",
        "nu",
    ]

    const colors = [
        "black",
        "white",
        "brown",
        "yellow",
        "silver",
        "blue",
        "navy",
        "pink",
    ]

    const straps = [
        "da",
        "kim loại",
        "phukien",
    ]


    useEffect(()=>{

        if (success){
            alert("Thêm sản phẩm thành công !")
            history("/admin/products")
            dispatch(newProductSlice.actions.newProductReset())
        }
    },[dispatch,success,history])


    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(newProduct({name,price,description, category,brand,color,strap,stock, image, discount}))
    }

    console.log({name,price,description, category,brand,color,strap,stock, image, discount})
  return (
    <Fragment>
        <MetaData title = "Thêm sản phẩm mới (admin)"/>
        <TopBar/>
        <div style={{display:"flex"}}>
            <SideBar/>
            <NewProductContainer>
                

            <h1>Thêm sản phẩm mới</h1>
                     
                <Form
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                >
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                        <Grid item xs={4}>
                            <h4>Tên sản phẩm:</h4>
                        </Grid>
                        <Grid item xs={6}>
                            <SpellcheckIcon />
                            <Input
                                type="text"
                                placeholder="Tên sản phẩm"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={4}>  <h4>Thương hiệu:</h4>  </Grid>
                        <Grid item xs={6}>    
                            <DescriptionIcon />
                            <TextArea
                                placeholder="Thương hiệu"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                cols="30"
                                rows="1"
                            ></TextArea>
                        </Grid>

                        


                        <Grid item xs={4}>
                            <h4>Mô tả sản phẩm:</h4>
                        </Grid>
                        <Grid item xs={6}>    
                            <DescriptionIcon />
                            <TextArea
                                placeholder="Mô tả sản phẩm"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                                style={{height:"100px"}}
                            ></TextArea>
                        </Grid>

                        <Grid item xs={4}> <h4>Phân loại:</h4> </Grid>
                        <Grid item xs={6}>    
                            <CategoryIcon />
                            <Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Phân loại</option>
                                {categories.map((cate) => (
                                <option key={cate} value={cate}>
                                    {cate}
                                </option>
                                ))}
                            </Select>
                        </Grid>

                        

                        <Grid item xs={4}>  <h4>Màu sắc: </h4>  </Grid>
                        <Grid item xs={6}>    
                            <CategoryIcon />
                            <Select onChange={(e) => setColor(e.target.value)}>
                                <option value="">Chọn màu sắc</option>
                                {colors.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={4}>  <h4>Loại dây đeo: </h4>  </Grid>
                        <Grid item xs={6}>    
                            <CategoryIcon />
                            <Select onChange={(e) => setStrap(e.target.value)}>
                                <option value="">Chọn loại dây</option>
                                {straps.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={4}>  <h4>Đường dẫn hình ảnh: </h4>  </Grid>
                        <Grid item xs={6}>    
                            <DescriptionIcon />
                            <TextArea
                                placeholder="Link Image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                cols="30"
                                rows="1"
                            ></TextArea>
                        </Grid>



                        <Grid item xs={4}>
                            <h4>Giá:</h4>
                        </Grid>
                        <Grid item xs={6}>
                            <AttachMoneyIcon />
                            <Input
                                type="number"
                                placeholder="Giá"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </Grid>


                        <Grid item xs={4}>  <h4>Số lượng trong kho: </h4>  </Grid>
                        <Grid item xs={6}>    
                            <StorageIcon />
                            <Input
                                type="number"
                                placeholder="Trong kho"
                                required
                                onChange={(e) => setStock(e.target.value)}
                                value={stock}
                            />
                        </Grid>


                        <Grid item xs={4}>  <h4>Giảm giá: </h4>  </Grid>
                        <Grid item xs={6}>    
                            <DiscountIcon />
                            <Input
                                type="number"
                                placeholder="Giảm giá"
                                required
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
                            />
                        </Grid>

                       
                        
                        <Grid item xs={4}> </Grid>
                        <Grid item xs={6}>    
                            <Button
                                type="submit"
                                size="large"
                                variant="contained"
                                // disabled={isLoading ? true : false}
                                >
                                Thêm sản phẩm
                            </Button>
                        </Grid>
                    </Grid>
                    </Box>  
                </Form>
            </NewProductContainer>
        </div>
    </Fragment>
  )
}

export default NewProduct