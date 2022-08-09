import React, {Fragment} from 'react'
import { Typography, Stepper, StepLabel, Step  } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import styled from '@emotion/styled';

const Container = styled.div`
  padding: 20px;
`


const CheckoutSteps = ({activeStep}) => {
    

    const steps = [
        {
            label: <Typography>Thông tin giao hàng</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Xác nhận đơn hàng</Typography>,
            icon: <LibraryAddCheckIcon/>
        },
        {
            label: <Typography>Thanh toán</Typography>,
            icon: <AccountBalanceWalletIcon/>
        },
    ]

        
    const stepStyles = {
            boxSizing: "border-box",
    };

  return (
    <Fragment>
      <Container>
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
          {steps.map((item, index) => (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel
                style={{
                  color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                }}
                icon={item.icon}
              >
                {item.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
    </Fragment>
  )
}

export default CheckoutSteps