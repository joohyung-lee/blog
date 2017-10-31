import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';
import {pending} from 'redux/helper/pending'
import { Map,List ,fromJS} from 'immutable';

//액션
const POSTS_GET='POSTS/GET';
const POSTS_DELETE='POSTS/DELETE';
const POSTS_CATEGORY_GET='POSTS/CATEGORY_GET';
const POSTS_OLD_GET='POSTS/OLD_GET';
const POSTS_SINGLE_GET='POSTS/SINGLE_GET';
const POSTS_STAR_SAVE='POSTS/STAR_SAVE';
//액션생성자


//초기화
const initialState=Map({
    listData:Map({
        pending: false,
        error: false,
        state:'',
        lastPosts:false,
        page:1,
        pages:List([]),
        total:1,
        data: List([]),
        starred:Map({
            pending: false,
            error: -1,
            state:'',
        }),
        oldPosts:Map({
            pending: false,
            error: -1,
            state:'',
        }),
        delPosts:Map({
            pending: false,
            error: -1,
            state:'',
        }),
    }),
    itemData:Map({
        pending: false,
        error: -1,
        data: List([]),
    }),
    
    
})
//리듀서
export default handleActions({
    //load all posts
    ...pending({
        type:POSTS_GET,
        name:['listData'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            let pages=[];
            for(let i=0; i< data.pages; i++){
                pages.push(i)
            }
            return state.setIn(['listData','data'],data.docs)
                        .setIn(['listData','page'],Number(data.page)) 
                        .setIn(['listData','pages'],pages) 
                        .setIn(['listData','total'],data.total)                      
        }
    }),
    //delete post
    ...pending({
        type:POSTS_DELETE,
        name:['listData','delPosts'],
        successResult:(state,action)=>{
            const {index}=action.payload;
            const postsArr = fromJS(state.getIn(['listData','data']));
            return state.setIn(['listData','data'],postsArr.splice(index,1))
                
        }
    }),
    //load category posts
    ...pending({
        type:POSTS_CATEGORY_GET,
        name:['listData'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            return state.setIn(['listData','data'],data)
                        .setIn(['listData','lastPosts'],false)                      
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
    //give star to post
    ...pending({
        type:POSTS_STAR_SAVE,
        name:['listData','starred'],
        successResult:(state,action)=>{
            const {response,index}=action.payload;
            const dataArr = fromJS(state.getIn(['listData','data']));
            return state.setIn(['listData','data'],dataArr.update(
                index,
                (item)=>response.data.post
            ));
        }
    }),
    
}, initialState);