import React from "react"
import styled from "@emotion/styled"
import VisibilityIcon from '@mui/icons-material/Visibility';

const WidgetSmallContainer = styled.div`
     flex: 1;
     -webkit-box-shadow: 0px 0px 13px -6px #000000; 
     box-shadow: 0px 0px 13px -6px #000000;
     padding: 20px;
     margin-right: 20px;
`

const WidgetSmallTitle = styled.span`
    font-size: 22px;
    font-weight: 600;   
`

const WidgetSmallList = styled.ul`
     margin: 0;
     padding: 0;
     list-style: none;
` 

const WidgetSmallItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0px;
`

const WidgetSmallImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`

const WidgetSmallUser = styled.div`
    display: flex;
    flex-direction: column;
`

const WidgetSmallUserName = styled.span`
    font-weight: 600;
`

const WidgetSmallUserTitle = styled.span`
    font-weight: 300;
`

const WidgetSmallButton = styled.button`
    display: flex;
    align-items: center;
    border: none;
    border-radius: 10px;
    padding: 7px 10px;
    background-color: #eeeef7;
    color: #555;
    cursor: pointer;
`

const WidgetSmallIcon = {
    'font-size': '16px',
    'margin-right': '5px'
}

export default function WidgetSmall() {
  return (
    <WidgetSmallContainer>
        <WidgetSmallTitle>Người dùng mới</WidgetSmallTitle>
        <WidgetSmallList>
            <WidgetSmallItem>
                <WidgetSmallImg/>
                <WidgetSmallUser>
                    <WidgetSmallUserName>Dương Nguyễn Thuận</WidgetSmallUserName>
                    <WidgetSmallUserTitle>Trùm cuối</WidgetSmallUserTitle>
                </WidgetSmallUser>
                <WidgetSmallButton>
                    <VisibilityIcon style={WidgetSmallIcon}/>
                    Hiển thị
                </WidgetSmallButton>
            </WidgetSmallItem> 
            <WidgetSmallItem>
                <WidgetSmallImg/>
                <WidgetSmallUser>
                    <WidgetSmallUserName>Dương Đình Thắng</WidgetSmallUserName>
                    <WidgetSmallUserTitle>Trùm phụ</WidgetSmallUserTitle>
                </WidgetSmallUser>
                <WidgetSmallButton>
                    <VisibilityIcon style={WidgetSmallIcon}/>
                    Hiển thị
                </WidgetSmallButton>
            </WidgetSmallItem> 
            <WidgetSmallItem>
                <WidgetSmallImg/>
                <WidgetSmallUser>
                    <WidgetSmallUserName>Trịnh Nhật Tân</WidgetSmallUserName>
                    <WidgetSmallUserTitle>Bao cát</WidgetSmallUserTitle>
                </WidgetSmallUser>
                <WidgetSmallButton>
                    <VisibilityIcon style={WidgetSmallIcon}/>
                    Hiển thị
                </WidgetSmallButton>
            </WidgetSmallItem> 
            <WidgetSmallItem>
                <WidgetSmallImg/>
                <WidgetSmallUser>
                    <WidgetSmallUserName>Nguyễn Trung Tuấn</WidgetSmallUserName>
                    <WidgetSmallUserTitle>Material UI</WidgetSmallUserTitle>
                </WidgetSmallUser>
                <WidgetSmallButton>
                    <VisibilityIcon style={WidgetSmallIcon}/>
                    Hiển thị
                </WidgetSmallButton>
            </WidgetSmallItem>
        </WidgetSmallList>
    </WidgetSmallContainer>
  ) 
}
