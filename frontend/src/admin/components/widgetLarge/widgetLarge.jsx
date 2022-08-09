import React from "react"
import styled from "@emotion/styled"
import "./widgetLarge.css"

const WidgetLargeContainer = styled.div`
    flex: 2;
    -webkit-box-shadow: 0px 0px 13px -6px #000000; 
    box-shadow: 0px 0px 13px -6px #000000;
    padding: 20px;
`

const WidgetLargeTitle = styled.h3`
    font-size: 22px;
    font-weight: 600
`

const WidgetLargeTable = styled.table`
    width: 100%;
    border-spacing: 20px;
`

const WidgetTableTr = styled.tr`

`

const WidgetTableTh = styled.th`
    text-align: left;
`

const WidgetTableTdUser = styled.td`
    display: flex;
    align-items: center;
    font-weight: 600;
`

const WidgetLargeUserImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`

const WidgetLargeUserName = styled.span`

`

const WidgetTableTdDate = styled.td`
    font-weight: 300;
`

const WidgetTableTdAmount = styled.td`
    font-weight: 300;
`

const WidgetTableTdStatus = styled.td`

`

export default function WidgetLarge() {
    const Button = ({type}) => {
        return <button className={"WidgetLargeButton " + type}>{type}</button>
    }
    return (
    <WidgetLargeContainer>
        <WidgetLargeTitle>Giao dịch gần nhất</WidgetLargeTitle>
        <WidgetLargeTable>
            <WidgetTableTr>
                <WidgetTableTh>
                    Tên khách hàng
                </WidgetTableTh>
                <WidgetTableTh>
                    Ngày giao dịch
                </WidgetTableTh>
                <WidgetTableTh>
                    Tổng giá trị
                </WidgetTableTh>
                <WidgetTableTh>
                    Trạng thái
                </WidgetTableTh>
            </WidgetTableTr>
            <WidgetTableTr>
                <WidgetTableTdUser>
                    <WidgetLargeUserImg/>
                    <WidgetLargeUserName>Dương Đình Thắng</WidgetLargeUserName>
                </WidgetTableTdUser>
                <WidgetTableTdDate>Ngày 5 tháng 6 năm 2022</WidgetTableTdDate>
                <WidgetTableTdAmount>120,000 VND</WidgetTableTdAmount>
                <WidgetTableTdStatus>
                    <Button type={"Approved"}/>
                </WidgetTableTdStatus>
            </WidgetTableTr>
            <WidgetTableTr>
                <WidgetTableTdUser>
                    <WidgetLargeUserImg/>
                    <WidgetLargeUserName>Dương Đình Thắng</WidgetLargeUserName>
                </WidgetTableTdUser>
                <WidgetTableTdDate>Ngày 5 tháng 6 năm 2022</WidgetTableTdDate>
                <WidgetTableTdAmount>120,000 VND</WidgetTableTdAmount>
                <WidgetTableTdStatus>
                    <Button type={"Declined"}/>
                </WidgetTableTdStatus>
            </WidgetTableTr>
            <WidgetTableTr>
                <WidgetTableTdUser>
                    <WidgetLargeUserImg/>
                    <WidgetLargeUserName>Dương Đình Thắng</WidgetLargeUserName>
                </WidgetTableTdUser>
                <WidgetTableTdDate>Ngày 5 tháng 6 năm 2022</WidgetTableTdDate>
                <WidgetTableTdAmount>120,000 VND</WidgetTableTdAmount>
                <WidgetTableTdStatus>
                    <Button type={"Pending"}/>
                </WidgetTableTdStatus>
            </WidgetTableTr>
        </WidgetLargeTable>
    </WidgetLargeContainer>
    ) 
}
