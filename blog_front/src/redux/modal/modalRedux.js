import { handleActions, createAction } from 'redux-actions';

//액션
const MODAL_OPEN = 'MODAL/MODAL_OPEN';
const MODAL_CLOSE = 'MODAL/MODAL_CLOSE';

//액션생성자
export const openModal = createAction(MODAL_OPEN);
export const closeModal = createAction(MODAL_CLOSE);



//초기화
const initialState={
    login:{
        open:false,
    },
    error:{
        open:false,
    }
}

//리듀서
export default handleActions({
    [MODAL_OPEN]: (state, action) => {
        //modalName으로 해당 모달 열기
        const {modalName} = action.payload;
        const modalState=state[modalName].open=true;
      
        return Object.assign({},state,modalState);

    },
    [MODAL_CLOSE]: (state, action) => {
         //modalName으로 해당 모달 닫기
        const {modalName} = action.payload;
        const modalState=state[modalName].open=false;
        return Object.assign({},state,modalState);
    }
}, initialState);