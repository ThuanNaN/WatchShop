import styled from '@emotion/styled'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {updateProfile, loadUser} from '../../redux/callAPI/userCall'
import {ProfileSlice} from '../../redux/Slice/userSlice'

import Loader from '../../components/Loader'
import MetaData from '../../components/MetaData'
import NewNavbar from '../../components/NewNavbar'

import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  background: #DCDCDC;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: 1.5px solid black;
  border-radius: 25px;
  font-size: 14px;
`;

const Button = styled.button`
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border: 2px solid teal;
  border-radius: 15px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;



const UpdateProfile = () => {
    const {currentUser, isAuthenticated} = useSelector((state)=> state.user);
    const { error, isUpdated, isLoading } = useSelector((state) => state.userProfile);


    const dispatch = useDispatch();
    const history = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");


    const handleClick = (e) =>{
        e.preventDefault();
        dispatch(updateProfile({name,email, avatar}));
      }

    useEffect(()=>{
        if(currentUser){
            setName(currentUser.name)
            setEmail(currentUser.email)
            setEmail(currentUser.avatar)
        }
        

        if (isUpdated){
            alert("Profile Updated Successfully");  
            dispatch(loadUser())          
            history("/account");
            dispatch(ProfileSlice.actions.updateProfileReset())
        
        }
      
    },[dispatch, history, currentUser, isUpdated])

  return (
    <Fragment>
        {isLoading ? 
        (
            <Loader/>
        )
        :
        (
            <Fragment>
                <MetaData title={"Update profile"}/>
                <div style={{position:"fixed", width:"100%"}}>
                  <NewNavbar/>  
                </div>
                <Container>
                    <Wrapper>
                        <Title>CẬP NHẬT THÔNG TIN</Title>
                        <Form>
                    
                                <Input 
                                    name = "Ho ten"
                                    type = "text"
                                    placeholder= "Họ tên"     
                                    // value={name}                           
                                    onChange={(e)=>setName(e.target.value)} />
                                <Input
                                  
                                    name = "email"
                                    type="email"
                                    placeholder='Email'
                                    // value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                />

                                <Input
                                    name = "image"
                                    type="text"
                                    placeholder='Ảnh đại diện'
                                    // value={avatar}
                                    onChange={(e)=>setAvatar(e.target.value)}
                                />
                                <Button onClick={handleClick}>Cập nhật</Button>
                        </Form>
                    </Wrapper>
                </Container>
            </Fragment>
        )}

    </Fragment>
  )
}

export default UpdateProfile