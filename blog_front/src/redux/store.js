// Redux 관련 불러오기
import { createStore ,applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import {fromJS,toJS} from 'immutable';
// Reducer load
import * as modalActions from 'redux/modal';
import * as httpRequest from 'redux/helper/httpRequest'
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
//로그인 팝업이 성공 후에 부모(opener)에게 함수 전달
window.loginSuccess = ()=> {
    store.dispatch(modalActions.openModal({
        modalName:'toast'
    }));
    store.dispatch(httpRequest.getAuth({
        type:'AUTH/PROFILE'
    }));

};

//로컬스토리지에 저장
store.subscribe(() => {
    if(window.location.pathname==='/admin/write'){
        const {admin} = store.getState();
        if(admin.getIn(['createData','save'])){
            return localStorage.removeItem('admin');
        }
        localStorage.setItem('admin', JSON.stringify(admin));
    }
});

export default store;
