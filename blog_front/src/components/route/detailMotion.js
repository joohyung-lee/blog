import React from 'react';
import PropTypes from 'prop-types';
import {withRouter,Route,Switch,Redirect} from 'react-router-dom';
import {RouterMotion} from 'components/route'
const DetailMotion = ({ component: Component, ...rest,eleX,eleY,eleW,eleH,itemPd}) => (
    <Route {...rest} render={props => (
      <RouterMotion 
        eleX={eleX} 
        eleY={eleY} 
        eleW={eleW-itemPd*2} 
        eleH={eleH-itemPd*2}
      >
        <Component {...props}/>
      </RouterMotion>
    )}/>
  )

export default DetailMotion;