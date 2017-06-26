import React, { Component } from 'react';
import 'styles/common/common.scss';
import Header from './header/header';

//firebase data
import firebaseConfig from 'firebase/firebaseConfig'; 
import firebase from 'firebase';
//redux
import * as authActions from 'redux/auth/authRedux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class App extends Component {
  constructor(){
    super();
    this.state={
      speed:20
    }

  }
  componentDidMount(){
    const {userId,userInfo}=this.props;
    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid;
        if (user != null) {
         
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          uid = user.uid; 
          userInfo.profile({user:uid});
        }else{
          console.log('사용자 없다');
        }
      } else {

          

      }
    });
 
    // //firebase tuto
    // const roofRef=database.ref();
    // const valueRef=roofRef.child('speed');
    // valueRef.on('value',snap=>{
     
    //   this.setState({
    //     speed:snap.val()
    //   });
    // });
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

export default connect(
  (state)=>({
        userId:state.auth.user
    }),
    (dispatch)=>({
        userInfo: bindActionCreators(authActions, dispatch)
    })
)
(App);
