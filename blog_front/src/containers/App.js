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
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
        }
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    const {userId,userInfo}=this.props;
    
    firebase.auth().onAuthStateChanged(function(user) {
       var user = firebase.auth().currentUser;
       var name, email, photoUrl, uid;   
      if (user) {
        // User is signed in.        
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          uid = user.uid; 
          userInfo.profile(uid);
  
      } else {
        userInfo.profile(uid);
        console.log('사용자가 없어짐');
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
        <h2>{this.props.userId}</h2>
        <h1>{this.state.speed}</h1>
          <Header/>
      </div>
    );
  }
}

export default connect(
  (state)=>({
        userId:state.auth.profile.uid
    }),
    (dispatch)=>({
        userInfo: bindActionCreators(authActions, dispatch)
    })
)
(App);
