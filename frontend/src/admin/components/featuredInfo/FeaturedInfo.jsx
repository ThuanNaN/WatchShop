import React from "react"
import styled from "@emotion/styled";

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const FeaturedInfoContainer = styled.div`
    padding: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const FeaturedItem = styled.div`
    flex: 1;
    margin: 0px 20px;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    -webkit-box-shadow: 5px 5px 15px 5px #000000; 
    box-shadow: 5px 5px 15px 5px #000000;
`

const FeaturedTitle = styled.span`
    font-size: 20px;
`

const FeaturedMoneyContainer = styled.div`
    margin: 10px 0px;
    display: flex;
    align-items: center;
`

const FeaturedMoney = styled.span`
    font-size: 30px;
    font-weight: 600;
`

const FeaturedMoneyRate = styled.span`
    display: flex;
    align-items: center;
    margin-left: 20px;
`

const FeaturedSubtitle = styled.span`
    font-size: 15px;
    color: gray;
`

export default function FeaturedInfo() {
  return (
    <FeaturedInfoContainer>
        <FeaturedItem>
            <FeaturedTitle>Doanh thu</FeaturedTitle>
            <FeaturedMoneyContainer>
                <FeaturedMoney>120,200 VND</FeaturedMoney>
                <FeaturedMoneyRate>
                    -12.1 <ArrowDownwardIcon/>
                </FeaturedMoneyRate>
            </FeaturedMoneyContainer>
            <FeaturedSubtitle>So sánh với tháng trước</FeaturedSubtitle>
        </FeaturedItem>
        <FeaturedItem>
            <FeaturedTitle>Lợi nhuận</FeaturedTitle>
            <FeaturedMoneyContainer>
                <FeaturedMoney>50,000 VND</FeaturedMoney>
                <FeaturedMoneyRate>
                    -12.1 <ArrowDownwardIcon/>
                </FeaturedMoneyRate>
            </FeaturedMoneyContainer>
            <FeaturedSubtitle>So sánh với tháng trước</FeaturedSubtitle>
        </FeaturedItem>
    </FeaturedInfoContainer>
  )
}
