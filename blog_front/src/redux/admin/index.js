import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';
import {pending} from 'redux/helper/pending'
import { Map,List } from 'immutable';

//액션
const ADMIN_TITLE_WRITE = 'ADMIN/ADMIN_TITLE_WRITE';
const ADMIN_POST_WRITE = 'ADMIN/ADMIN_POST_WRITE';
const ADMIN_IFRAMEURL_WRITE = 'ADMIN/ADMIN_IFRAMEURL_WRITE';
const ADMIN_CATEGORY_WRITE = 'ADMIN/ADMIN_CATEGORY_WRITE';
const ADMIN_TAGS_WRITE = 'ADMIN/ADMIN_TAGS_WRITE';
const ADMIN_TAGS_DELETE = 'ADMIN/ADMIN_TAGS_DELETE';

const ADMIN_MODIFY = 'ADMIN/ADMIN_MODIFY';
const ADMIN_DELETE = 'ADMIN/ADMIN_DELETE';
const ADMIN_GET='ADMIN/GET';
const ADMIN_SINGLE_GET='ADMIN/SINGLE_GET';

//이미지 업로드 액션
const ADMIN_THUMB_UPLOAD='ADMIN/THUMB_UPLOAD';
const ADMIN_THUMB_DELETE='ADMIN/THUMB_DELETE';
const ADMIN_FILE_UPLOAD='ADMIN/FILE_UPLOAD';
const ADMIN_FILE_DELETE='ADMIN/FILE_DELETE';

//액션생성자
export const titleWrite = createAction(ADMIN_TITLE_WRITE);
export const iframeUrlWrite = createAction(ADMIN_IFRAMEURL_WRITE);
export const postCategory = createAction(ADMIN_CATEGORY_WRITE);
export const postTags = createAction(ADMIN_TAGS_WRITE);
export const deleteTag=createAction(ADMIN_TAGS_DELETE);
export const postWrite = createAction(ADMIN_POST_WRITE);
export const postModify = createAction(ADMIN_MODIFY);

//초기화
const initialState=Map({
    createData:Map({
        pending: false,
        error: false,
        data:Map({
                title:'',
                body:'',
                thumbnail:Map({
                    pending: false,
                    error: false,
                    data: Map({}),
                }),
                files:Map({
                    pending: false,
                    error: false,
                    data: List([]),
                }),
                iframeUrl:'',
                category:'',
                tags:List([])
            }),
    }),
    listData:Map({
        pending: false,
        error: false,
        data: List([]),
    }),
    itemData:Map({
        pending: false,
        error: false,
        data: List([]),
    }),
    
    
})
//리듀서
export default handleActions({
    [ADMIN_TITLE_WRITE]: (state, action) => {  
        const {title} = action.payload;
        return state.setIn(['createData','data','title'],title)
    },
    [ADMIN_POST_WRITE]: (state, action) => {  
        const {body} = action.payload;
        return state.setIn(['createData','data','body'],body)
    },
    [ADMIN_IFRAMEURL_WRITE]: (state, action) => {  
        const {iframeUrl} = action.payload;
        return state.setIn(['createData','data','iframeUrl'],iframeUrl)
    },
    [ADMIN_CATEGORY_WRITE]: (state, action) => {  
        const {category} = action.payload;
        return state.setIn(['createData','data','category'],category)
    },
    [ADMIN_TAGS_WRITE]: (state, action) => {  
        const {tags} = action.payload;
        const tagsArr = state.getIn(['createData','data','tags']);
        return state.setIn(['createData','data','tags'],tagsArr.push(tags));
    },
    [ADMIN_TAGS_DELETE]: (state, action) => {  
        const {index} = action.payload;
        const tagsArr = state.getIn(['createData','data','tags']);
        return state.setIn(['createData','data','tags'],tagsArr.splice(index,1));
    },
    
    //포스트글 수정
    [ADMIN_MODIFY]: (state, action) => {  
        const {source,index} = action.payload;
        return state['itemData'].data[index].set('title', source)
    },
    //포스트 리스트 불러오기
    ...pending({
        type:ADMIN_GET,
        name:['listData'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            return state.setIn(['listData','data'],data);
        }
    }),
    //개별 포스트 불러오기
    ...pending({
        type:ADMIN_SINGLE_GET,
        name:['itemData'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            return state.setIn(['itemData','data'],data);
        }
    }),
    //썸네일 이미지 업로드
    ...pending({
        type:ADMIN_THUMB_UPLOAD,
        name:['createData','data','thumbnail'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            return state.setIn(['createData','data','thumbnail','data'],data);
        }
    }),
    //썸네일 이미지 지우기
    ...pending({
        type:ADMIN_THUMB_DELETE,
        name:['createData','data','thumbnail'],
        successResult:(state,action)=>{
            const fileArr = state.getIn(['createData','data','thumbnail','data']);
            return state.setIn(['createData','data','thumbnail','data'],'');
        }
    }),
    //포스트 이미지 업로드
    ...pending({
        type:ADMIN_FILE_UPLOAD,
        name:['createData','data','files'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            const fileArr = state.getIn(['createData','data','files','data']);
            return state.setIn(['createData','data','files','data'],fileArr.concat(data));
        }
    }),
    //포스트 이미지 지우기
    ...pending({
        type:ADMIN_FILE_DELETE,
        name:['createData','data','files'],
        successResult:(state,action)=>{
            const {data,index}=action.payload;
            const fileArr = state.getIn(['createData','data','files','data']);
            return state.setIn(['createData','data','files','data'],fileArr.splice(index,1));
        }
    }),
    
    
}, initialState);