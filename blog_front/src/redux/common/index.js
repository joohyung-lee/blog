import { handleActions, createAction } from 'redux-actions';
import {Map} from 'immutable';
//액션
const IS_HEADER= 'COMMON/IS_HEADER';
const SEARCH_VALUE='COMMON/SEARCH_VALUE';
const MAINLOAD='COMMON/MAINLOAD';
const IS_BRIGHTNESS='COMMON/IS_BRIGHTNESS';
//액션생성자
export const isHeader = createAction(IS_HEADER);
export const searchValue = createAction(SEARCH_VALUE);
export const mainLoad = createAction(MAINLOAD);
export const isBrightness = createAction(IS_BRIGHTNESS);

//초기화
const initialState=Map({
    isHeader:true,
    searchValue:'',
    mainLoad:false,
    isBright:true
  
})

//리듀서
export default handleActions({
    [IS_HEADER]:(state,action)=>{
        const {visible}=action.payload;
        return state.set('isHeader',visible)
    },
    [SEARCH_VALUE]:(state,action)=>{
        const {searchValue}=action.payload;
        return state.set('searchValue',searchValue)
    },
    [MAINLOAD]:(state,action)=>{
        const {mainLoad}=action.payload;
        return state.set('mainLoad',mainLoad)
    },
    [IS_BRIGHTNESS]:(state,action)=>{
        const {isBright}=action.payload;
        return state.set('isBright',isBright)
    }
 
}, initialState);