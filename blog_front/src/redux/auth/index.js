import { handleActions, createAction } from 'redux-actions';
import {pending} from 'redux/helper/pending'
import {Map} from 'immutable';
//액션
const PROFILE= 'AUTH/PROFILE';
const PROFILE_LOGOUT='AUTH/PROFILE_LOGOUT';
const PROFILE_COOKIE='AUTH/PROFILE_COOKIE'
//액션생성자
export const profile = createAction(PROFILE);
export const profileCookie=createAction(PROFILE_COOKIE);


//초기화
const initialState=Map({
    profile:Map({
        pending: false,
        error: false,
        isLogin:false,
        user:Map({})
    })
  
})

//리듀서
export default handleActions({
    [PROFILE_COOKIE]:(state,action)=>{
        const {userInfo}=action.payload;
        return state.setIn(['profile','user'],userInfo)
                    .setIn(['profile','isLogin'],true)
    },
    //인증하기
    ...pending({
        type:PROFILE,
        name:['profile'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            document.cookie = 'user=' + btoa(JSON.stringify(data.user))+'; path=/';
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
        }
    }),
}, initialState);