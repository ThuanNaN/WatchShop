import React, {Fragment, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import {getProductDetail, updateProduct} from '../../../redux/callAPI/productCall'
import {productSlice, updateDeleteProductSlice} from '../../../redux/Slice/productSlice'
import SideBar from '../../components/sidebar/SideBar';
import TopBar from '../../components/topbar/TopBar';
import styled from '@emotion/styled';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CategoryIcon from '@mui/icons-material/Category';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import DiscountIcon from '@mui/icons-material/Discount';

const UpdateProductContainer = styled.div`
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


const UpdateProduct = () => {
    const history = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { error, product } = useSelector((state) => state.product);

    const {
        isLoading,
        error: updateError,
        isUpdated,
      } = useSelector((state) => state.updateDeleteProduct);

    const productId = location.pathname.split('/')[3]

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");
    const [strap,setStrap] = useState("");
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState("");
    const [discount, setDiscount] = useState(0);


    useEffect(()=>{
        if (product && product._id !== productId || !product) {
            dispatch(getProductDetail(productId));
        }
        else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setBrand(product.brand);
            setColor(product.color);
            setStrap(product.strap);
            setStock(product.stock);
            setImage(product.image);
            setDiscount(product.discount);
        }
        if (error) {
            alert.error(error);
            dispatch(productSlice.actions.clearError());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(updateDeleteProductSlice.actions.clearErr());
        }
        if (isUpdated) {
            alert("Sản phẩm đã được cập nhật !");
            history("/admin/products");
            dispatch(updateDeleteProductSlice.actions.updateProuctReset());
        }

    }, [dispatch,error,updateError,history,productId,product,isUpdated])


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

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct([productId, {name, price, description, category,brand,color,strap, stock, image, discount}]));
    }



  return (
    <Fragment>
        <TopBar/>
        <div style={{display:"flex"}}>
            <SideBar/>
            <UpdateProductContainer>
                <h1>Chỉnh sửa sản phẩm</h1>
                     
                <Form
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
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
                                placeholder="Brand"
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
                            <Select
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            >
                                <option value="">Màu sắc</option>
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
                            <Select
                                value={strap}
                                onChange={(e) => setStrap(e.target.value)}
                            >
                                <option value="">Loại dây đeo</option>
                                {straps.map((st) => (
                                <option key={st} value={st}>
                                    {st}
                                </option>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={4}> <h4>Dường dẫn hình ảnh:</h4>  </Grid>
                        <Grid item xs={6}>
                            <InsertLinkIcon />
                            <Input
                                type="text"
                                placeholder="Đường dẫn hình ảnh"
                                required
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </Grid>


                        <Grid item xs={4}>
                            <h4>Giá:</h4>
                        </Grid>
                        <Grid item xs={6}>
                            <AttachMoneyIcon />
                            <Input
                                type="number"
                                placeholder="Price"
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
                                placeholder="Stock"
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
                                Cập nhật
                            </Button>
                        </Grid>
                    </Grid>
                    </Box>  
                </Form>
            </UpdateProductContainer>
        </div>
    </Fragment>
  )
}

export default UpdateProduct