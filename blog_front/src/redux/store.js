// Redux 관련 불러오기
import { createStore ,applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import {fromJS} from 'immutable';
// Reducer load
import modules from './';
let composeEnhancers;
const middleware=applyMiddleware(thunk);
if(process.env.NODE_ENV === "development"){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
}else{
    composeEnhancers = compose;
}


// 스토어 생성

const persistedState=localStorage.getItem('admin')?
    {
        admin:fromJS(JSON.parse(localStorage.getItem('admin')))
    }:{}
const store = createStore(modules,persistedState,composeEnhancers(middleware));
store.subscribe(() => {
    const { admin} = store.getState();
    localStorage.setItem('admin', JSON.stringify(admin));
});

export default store;
