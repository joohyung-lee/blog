// Redux 관련 불러오기
import { createStore ,applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'

// Reducer load
import modules from './';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware=applyMiddleware(thunk);
// 스토어 생성
const store = createStore(modules,composeEnhancers(middleware));

export default store;