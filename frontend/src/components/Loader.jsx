import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: white;
    display: grid;
    place-items: center;
    max-width: 100%;
`

const loadingRotate = keyframes`
    to {
        transform: rotateZ(-360deg);
    }
`

const CirleLoader = styled.div`
    width: 10vmax;
    height: 10vmax;
    border-bottom: 5px solid rgba(0, 0, 0, 0.719);

    border-radius: 50%;

    animation: ${loadingRotate} 800ms linear infinite;
`


const Loader = () => {
  return (
    <Container>
        <CirleLoader/>
    </Container>
  )
}

export default Loader