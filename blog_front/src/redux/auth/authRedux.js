import { handleActions, createAction } from 'redux-actions';
//액션
const PROFILE= 'AUTH/PROFILE';

//액션생성자
export const profile = createAction(PROFILE);



//초기화
const initialState={
    profile:{
        uid:null
    }
  
}

//리듀서
export default handleActions({
    [PROFILE]: (state, action) => {
      const uid = action.payload;
       return{ 
                ...state,
                profile:{
                    uid
                }
            }

    }
}, initialState);