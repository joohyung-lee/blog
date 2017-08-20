import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';
import {pending,getPost} from 'redux/helper/pending'


//액션
const ADMIN_CREATE = 'ADMIN/ADMIN_CREATE';
const ADMIN_MODIFY = 'ADMIN/ADMIN_MODIFY';
const ADMIN_DELETE = 'ADMIN/ADMIN_DELETE';
const ADMIN_GET='ADMIN/GET';
const ADMIN_SINGLE_GET='ADMIN/SINGLE_GET';

//액션생성자
export const postCreate = createAction(ADMIN_CREATE);
export const postModify = createAction(ADMIN_MODIFY);
export const postDelete = createAction(ADMIN_DELETE);

//초기화
const initialState={
    pending: false,
    error: false,
    data: [],
    single:{}
}

//리듀서
export default handleActions({
    [ADMIN_CREATE]: (state, action) => {  
        const {source,index} = action.payload;
        return {
            ...state,
            data:[
                ...state.data[index],
                {
                    ...state.data[index],
                    title:source
                }
            ]
        };

    },
    [ADMIN_MODIFY]: (state, action) => {  
        return {
            ...state,
            contents:'1'
        };

    },
    ...pending({
        type:ADMIN_GET
    }),
    ...pending({
        type:ADMIN_SINGLE_GET
    })
    
    
}, initialState);