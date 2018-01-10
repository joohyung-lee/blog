import { handleActions, createAction } from 'redux-actions';
import {pending} from 'redux/helper/pending'
import {Map} from 'immutable';
//액션
const PROFILE= 'AUTH/PROFILE';
const ADMIN_PROFILE= 'AUTH/ADMIN_PROFILE';
const PROFILE_LOGOUT='AUTH/PROFILE_LOGOUT';
//액션생성자
export const profile = createAction(PROFILE);


//초기화
const initialState=Map({
    profile:Map({
        pending: false,
        error: -1,
        isLogin:false,
        user:Map({})
    }),
    adminProfile:Map({
        pending: false,
        error: -1,
        isLogin:false,
        user:Map({})
    })
  
})

//리듀서
export default handleActions({
    //관리자 인증하기
    ...pending({
        type:ADMIN_PROFILE,
        name:['adminProfile'],
        successResult:(state,action)=>{
            const {data}=action.payload;
           
            return state.setIn(['adminProfile','user'],data.user)
                        .setIn(['adminProfile','isLogin'],true)
        }
    }),
    //인증하기
    ...pending({
        type:PROFILE,
        name:['profile'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            return state.setIn(['profile','user'],data.user)
                        .setIn(['profile','isLogin'],true)
        }
    }),
    //로그아웃
    ...pending({
        type:PROFILE_LOGOUT,
        name:['profile'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            return state.setIn(['profile','user'],data.user)
                        .setIn(['profile','isLogin'],false)
                        .setIn(['profile','cookie'],false)
        }
    }),
}, initialState);