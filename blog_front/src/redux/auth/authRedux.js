import { handleActions, createAction } from 'redux-actions';

//액션
const PROFILE= 'AUTH/PROFILE';

//액션생성자
export const profile = createAction(PROFILE);



//초기화
const initialState={
    user:null
  
}

//리듀서
export default handleActions({
    [PROFILE]: (state, action) => {
      const user = action.payload;
       return{ 
                ...state,
                user:user
            }

    }
}, initialState);