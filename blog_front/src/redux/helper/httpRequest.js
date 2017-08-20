import axios from 'axios';

function getPostAPI() {
    return axios.get(`/api/post`);
}
function getPostSingleAPI(postId){
    return axios.get(`/api/post/${postId}`);
}
const actions=(type)=>{
    return {
        PENDING : `${type}_PENDING`,
        SUCCESS : `${type}_SUCCESS`,
        FAILURE : `${type}_FAILURE`
    }
}
export const getPost = (type,postId) => dispatch => { 
    const actionType=actions(type);
    //type
    const ADMIN_GET='ADMIN/GET';
    const ADMIN_SINGLE_GET='ADMIN/SINGLE_GET';
    // 요청이 시작 
    dispatch({type: actionType.PENDING});
    if(type==ADMIN_GET){
    // 요청을 시작합니다
        return getPostAPI().then(
            (response) => {
                dispatch({
                    type: actionType.SUCCESS,
                    payload: response
                })
            }
        )
    }
    else if(type==ADMIN_SINGLE_GET){
        return getPostSingleAPI(postId).then(
            (response) => {
                dispatch({
                    type: actionType.SUCCESS,
                    payload: response
                })
            }
        )
    }    
}
