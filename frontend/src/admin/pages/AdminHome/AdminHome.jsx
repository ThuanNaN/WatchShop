import React, { Fragment } from 'react'
import styled from '@emotion/styled'

import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import WidgetLarge from '../../components/widgetLarge/widgetLarge'
import WidgetSmall from '../../components/widgetSmall/WidgetSmall'
import SideBar from '../../components/sidebar/SideBar'
import TopBar from '../../components/topbar/TopBar'
import MetaData from '../../../components/MetaData'

const HomeContainer = styled.div`
    flex: 4;
`

const HomeWidgetsContainer = styled.div`
    display: flex;
    margin: 20px;
`

export default function AdminHome() {
  return (
    <Fragment>
      <MetaData title = "Admin Home" />
      <TopBar/>
      <div style={{display:"flex"}}>
        <SideBar/>  
        <HomeContainer>
            <FeaturedInfo/>
            <HomeWidgetsContainer>
                <WidgetSmall/>
                <WidgetLarge/>
            </HomeWidgetsContainer>
        </HomeContainer>
      </div>
    </Fragment>
  )
}
