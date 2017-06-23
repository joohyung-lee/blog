import { handleActions, createAction } from 'redux-actions';

//액션
const MODAL_OPEN = 'MODAL/MODAL_OPEN';
const MODAL_CLOSE = 'MODAL/MODAL_CLOSE';

//액션생성자
export const openModal = createAction(MODAL_OPEN);
export const closeModal = createAction(MODAL_CLOSE);



//초기화
const initialState={
    open:true,
}

//리듀서
export default handleActions({
    [MODAL_OPEN]: (state, action) => {
        return{
            ...state,
            open:true
        };
    },
    [MODAL_CLOSE]: (state, action) => {
        return{
            ...state,
            open:false
        };
    }
}, initialState);