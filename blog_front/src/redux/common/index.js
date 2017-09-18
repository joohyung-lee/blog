import { handleActions, createAction } from 'redux-actions';
import {pending} from 'redux/helper/pending'
import {Map} from 'immutable';
//액션
const IS_HEADER= 'COMMON/IS_HEADER';

//액션생성자
export const isHeader = createAction(IS_HEADER);


//초기화
const initialState=Map({
    isHeader:true
  
})

//리듀서
export default handleActions({
    [IS_HEADER]:(state,action)=>{
        const {visible}=action.payload;
        return state.set('isHeader',visible)
    },
 
}, initialState);