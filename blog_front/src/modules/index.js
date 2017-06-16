import { handleActions, createAction } from 'redux-actions';


//액션
const ACTION = 'ACTION';

//액션생성자
export const action = createAction(ACTION);



//초기화
const initialState={
    something:0
}

//리듀서
export default handleActions({
    [ACTION]: (state, action) => {
        return{
            ...state,
            something:1
        }
    },
}, initialState);