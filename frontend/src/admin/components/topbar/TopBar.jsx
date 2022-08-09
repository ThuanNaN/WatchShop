import React from 'react'
import styled from '@emotion/styled'

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PublicIcon from '@mui/icons-material/Public';
import SettingsIcon from '@mui/icons-material/Settings';
import {Link} from 'react-router-dom'

const TopBarContainer = styled.div`
    padding: 30px;
    width: 100%;
    height: 50px;
    background-color: white;
    position: sticky;
    top: 0;
    z-index: 999;
`

const TopbarWrapper = styled.div`
    height: 100%;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const TopLeft = styled.div`

`

const TopRight = styled.div`
    display: flex;
    align-items: center;
`

const AdminLogo = styled.span`
    font-weight: bold;
    font-size: 30px;
    color: darkblue;
    cursor: pointer;
` 

const TopBarIconContainer = styled.div`
    position: relative;
    cursor: pointer;
    margin-right: 10px;
    color: #555;

`

const TopIconBadge = styled.span`
    width: 15px;
    height: 15px;
    position: absolute;
    top: -5px;
    right: 0px;
    background-color: red;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
`

const TopAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
`

const TopMid = styled.div`
    cursor: pointer;
    > a {
        &:focus, &:hover, &:visited, &:link, &:active {
            text-decoration: none;
            color:black;
        }
    }

`

const Logo = styled.h1`
`


export default function TopBar() {
  return (
      <TopBarContainer>
          <TopbarWrapper>
              <TopLeft>
                <AdminLogo>
                    Admin Dashboard
                </AdminLogo>
              </TopLeft>
              
              <TopMid>  
                  <Link to = '/'>
                    <Logo>Shibamasi</Logo>
                  </Link>       
              </TopMid>

              <TopRight>
                    <TopBarIconContainer>
                        <NotificationsNoneIcon/>
                        <TopIconBadge>2</TopIconBadge>
                    </TopBarIconContainer>
                    <TopBarIconContainer>
                        <PublicIcon/>
                        <TopIconBadge>2</TopIconBadge>
                    </TopBarIconContainer>
                    <TopBarIconContainer>
                        <SettingsIcon/>
                    </TopBarIconContainer>
                    <TopAvatar></TopAvatar>
              </TopRight>
          </TopbarWrapper>
      </TopBarContainer>
  )
}
