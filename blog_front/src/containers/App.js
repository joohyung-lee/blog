import React, { Component } from 'react';
import 'styles/common/common.scss';
import Header from './header/header';

//firebase data
import database from 'firebase/firebaseConfig'; 
class App extends Component {
  constructor(){
    super();
    this.state={
      speed:20
    }

  }
  componentDidMount(){
    const roofRef=database.ref();
    const valueRef=roofRef.child('speed');
    valueRef.on('value',snap=>{
     
      this.setState({
        speed:snap.val()
      });
    });
  }
  render() {
    return (
      <div>
        <h1>{this.state.speed}</h1>
        <Header/>
      </div>
    );
  }
}

export default App;
