// Redux 관련 불러오기
import { createStore ,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
//action load
import * as actions from './modules';
// Reducer load
import modules from './modules';



// 스토어 생성
const store = createStore(modules,applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;