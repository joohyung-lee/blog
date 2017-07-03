import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

function getPostAPI(postId) {
    return axios.get(`/api/motionlab`);
}

//액션
const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

//액션생성자
export const postPending = createAction(GET_POST_PENDING);
export const postSuccess = createAction(GET_POST_SUCCESS);
export const postFailure = createAction(GET_POST_FAILURE);

export const getPost = (postId) => dispatch => {
    // 먼저, 요청이 시작했다는것을 알립니다
    dispatch({type: GET_POST_PENDING});
    // 요청을 시작합니다
    // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
    return getPostAPI(postId).then(
        (response) => {
            // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_POST_SUCCESS 액션을 디스패치합니다.
            console.log(response);
            dispatch({
                type: GET_POST_SUCCESS,
                payload: response
            })
        }
    )

}



//초기화
const initialState = {
    pending: false,
    error: false,
    data: [
        {
            title: '',
            body: ''
        }
    ]
}

//리듀서
export default handleActions({
    [GET_POST_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        };
    },
    [GET_POST_SUCCESS]: (state, action) => {
        return {
            ...state,
            pending: false,
            data:action.payload.data
        };
    },
    [GET_POST_FAILURE]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: true
        }
    }
}, initialState);