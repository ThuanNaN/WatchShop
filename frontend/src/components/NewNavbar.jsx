import React,{useState} from 'react'
import {Navbar, Nav, Container, Form, NavDropdown, FormControl, Button} from "react-bootstrap"
import styled from '@emotion/styled';
import {mobile} from "../responsive"
import { Link, useNavigate } from "react-router-dom";
import AccountOptions from './AccountOptions'

import { useSelector } from 'react-redux';

const MenuItem = styled.div`
    font-size: 15px;
    color:white;
    cursor: pointer;
    margin-left: 20px;
    ${mobile({ fontSize: "12px", marginTop: "20px", marginBottom: "20px" })}
`;

const StyledLink = styled(Link)`
  &:focus, &:hover, &:visited, &:link {
    color:black;
    text-decoration: none;
  }
`

const NewNavbar = () => {

    const {isAuthenticated,currentUser} = useSelector((state)=>state.user)
    
    // const quantity = useSelector(state=>state.cart.quantity)
    const [keyword, setKeyword] = useState("");
    const history = useNavigate()

    const handleSearch = (e) =>{
 
        e.preventDefault();
        if (keyword.trim()) {
            history(`/product-search/${keyword}`);
        } else {
        history("/products");
        }
    }


    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky='top'>
            <Container>
                <Navbar.Brand href="/" style={{fontSize:'30px'}}>Shibamasii</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href='/products'>Sản phẩm</Nav.Link>
                    <Nav.Link href='/products/nam'>Nam</Nav.Link>
                    <Nav.Link href='/products/nu'>Nữ</Nav.Link>
                    <Nav.Link href='/products/phukien'>Phụ kiện</Nav.Link>
{/* 
                    <NavDropdown title="Đồng hồ nam" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Brand 1</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Brand 2</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Other</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Đồng hồ nữ" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Brand 1</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Brand 2</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Other</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Phụ kiện" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Brand 1</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Brand 2</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Other</NavDropdown.Item>
                    </NavDropdown> */}

                    <NavDropdown title="Thông tin" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/about-us">Về chúng tôi</NavDropdown.Item>
                        <NavDropdown.Item href="/warranty">Chính sách bảo hành</NavDropdown.Item>
                        <NavDropdown.Item href="/shipping-policy">Chính sách vận chuyển</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Dịch vụ khác</NavDropdown.Item>
                    </NavDropdown>

                </Nav>
                <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Tìm kiếm"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                    />
                    <Button variant="outline-secondary" style={{width:'200px'}} onClick={handleSearch} >Tìm kiếm</Button>
                </Form>

                {isAuthenticated ? 
                (
                    
                    <MenuItem>
                        <AccountOptions currentUser={currentUser} />
                    </MenuItem>
                ) 
                :
                (
                    <StyledLink to={`/login`}>
                        <MenuItem >
                            ĐĂNG NHẬP
                        </MenuItem>
                    </StyledLink>
                )}
                
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
  };

export default NewNavbar