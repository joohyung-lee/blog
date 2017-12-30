
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default class SpringScrollbars extends Component {

    constructor(props, ...rest) {
        super(props, ...rest);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
      
    }

    getScrollTop() {
        //return this.refs.scrollbars.getScrollTop();
    }

    getScrollHeight() {
        //return this.refs.scrollbars.getScrollHeight();
    }

    getHeight() {
        //return this.refs.scrollbars.getHeight();
    }

    scrollTop(top) {
       
    }

    render() {
        return (
            <Scrollbars
                {...this.props}
                ref="scrollbars"/>
        );
    }
}