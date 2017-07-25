import React, { Component } from 'react';
import propTypes from 'prop-types';
import './test.scss';



class Main extends Component {
    constructor(props) {
    super(props)
    this.state = {
        items:[
            {key:'a',title:'title'},
            {key:'b',title:'title'},
            {key:'c',title:'title'},
            {key:'d',title:'title'},
            {key:'e',title:'title'},
            {key:'f',title:'title'},
            {key:'g',title:'title'},
            {key:'h',title:'title'},
            {key:'i',title:'title'},
            {key:'j',title:'title'}
        ]
    }
  }

    render() {
        return (
            <div>
            
            </div>

        )
    }
}

export default Main;