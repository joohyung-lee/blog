import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';
import {pending} from 'redux/helper/pending'
import { Map,List } from 'immutable';

//액션

const POSTS_GET='POSTS/GET';
const POSTS_OLD_GET='POSTS/OLD_GET';
const POSTS_SINGLE_GET='POSTS/SINGLE_GET';

//액션생성자


//초기화
const initialState=Map({
    listData:Map({
        pending: false,
        error: false,
        lastPosts:false,
        data: List([]),
        oldPosts:Map({
            
        })
    }),
    itemData:Map({
        pending: false,
        error: false,
        data: List([]),
    }),
    
    
})
//리듀서
export default handleActions({
    //포스트 리스트 불러오기
    ...pending({
        type:POSTS_GET,
        name:['listData'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            return state.setIn(['listData','data'],data)
                        
        }
    }),
    //load old 
    ...pending({
        type:POSTS_OLD_GET,
        name:['listData','oldPosts'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            const dataArr = state.getIn(['listData','data']);
            return state.setIn(['listData','data'],dataArr.concat(data))
                        .setIn(['listData','lastPosts'],(data.length<6)?true:false)
                        
        }
    }),
    //개별 포스트 불러오기
    ...pending({
        type:POSTS_SINGLE_GET,
        name:['itemData'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            return state.setIn(['itemData','data'],data);
        }
    }),
    
    
}, initialState);