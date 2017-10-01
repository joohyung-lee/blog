import { handleActions, createAction } from 'redux-actions';
import {pending} from 'redux/helper/pending'
import {Map} from 'immutable';
//액션
const MOTION= 'MAIN/MOTION';

//액션생성자
export const motionActions = createAction(MOTION);


//초기화
const initialState=Map({
    motions:Map({
        isPressed:false,
        clientWidth:0,
        clientHeight:0,
        min:0,
        max:0,
        posX:0,
        deltaX:0,
        offsetX:0,
        relative:0,
        active:0,
        moved:false,
        eleX:0,
        eleY:0,
        eleWidth:0,
        eleHeight:0,
        wrapperPd:0,
        itemPd:0
    })
})

//리듀서
export default handleActions({
    [MOTION]:(state,action)=>{
        const {motions}=action.payload;
        return state.mergeIn(['motions'],motions)
    },
 
}, initialState);