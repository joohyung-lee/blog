import axios from 'axios';
function getPostAPI() {
    return axios.get(`/api/post`);
}
function getPostSingleAPI(postId){
    return axios.get(`/api/post/${postId}`);
}
function thumbUpload(data){
    return axios.post('/api/images/thumb',data)
}
function thumbDelete(filename){
    return axios.delete(`/api/images/thumb/${filename}`);
}
function fileUpload(data){
    return axios.post('/api/images',data)
}
function fileDelete(filename){
    return axios.delete(`/api/images/${filename}`);
}
//pending type
const actions=(type)=>{
    return {
        PENDING : `${type}_PENDING`,
        SUCCESS : `${type}_SUCCESS`,
        FAILURE : `${type}_FAILURE`
    }
}
//포스트글 전부 불러오기
export const getPost = (type) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return getPostAPI().then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload: response
            })
        }
    )   
}
//개별 포스트글 불러오기
export const getSinglePost = (type,postId) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return getPostSingleAPI(postId).then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload: response
            })
        }
    )
}
//썸네일 이미지 업로드 
export const postThumb=({file,name,type})=>dispatch=>{
    let data = new FormData();
        data.append("thumb",file);
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return thumbUpload(data).then(
        (response)=>{
            dispatch({
                type: actionType.SUCCESS,
                payload:response,
            })
        }
    )
}
//썸네일 이미지 지우기
export const deleteThumb=({filename,type})=>dispatch=>{   
       const actionType=actions(type);
       dispatch({type: actionType.PENDING});
       return thumbDelete(filename).then(
           (response)=>{
               dispatch({
                   type: actionType.SUCCESS,
                   payload:response                   
               })
           }
       )
   }
//포스트 이미지 불러오기   
export const postFiles=({files,name,type})=>dispatch=>{
    let data = new FormData();
    for (let i = 0, len = files.length; i < len; i++) {
        data.append("photos",files[i]);
    }
    //data.append('name', name);  
    const actionType=actions(type); 
    dispatch({type: actionType.PENDING});
    return fileUpload(data).then(
        (response)=>{
            dispatch({
                type: actionType.SUCCESS,
                payload:response,
            })
        }
    )
}
//포스트 이미지 지우기
export const deleteFiles=({index,filename,type})=>dispatch=>{
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return fileDelete(filename).then(
        (response)=>{
            dispatch({
                type: actionType.SUCCESS,
                payload:{
                    response,
                    index:index
                },
            })
        }
    )
}
