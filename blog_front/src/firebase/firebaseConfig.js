//firebase load
import firebase from "firebase";
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDwwK55zGlZepwOqbi5ZGZlSarYXu21Bz0",
    authDomain: "joomation-blog.firebaseapp.com",
    databaseURL: "https://joomation-blog.firebaseio.com",
    projectId: "joomation-blog",
    storageBucket: "joomation-blog.appspot.com",
    messagingSenderId: "96650630304"
};

export default firebase.initializeApp(config);