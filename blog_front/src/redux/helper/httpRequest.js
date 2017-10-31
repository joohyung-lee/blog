import axios from 'axios';
//loading progress
let config = {
    onUploadProgress: progressEvent => {
        /* CONSTANTS */
        let initial = 0; 
        let delta = 1;
        let speed=0.3; 
        let percent=initial
        let requestAnimationFrameID = requestAnimationFrame(doAnim); // Start the loop.        
        let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
        function doAnim(percentCompleted) {
            if(percent>=80){
                cancelAnimationFrame(requestAnimationFrameID);
                return
            }
            if(percentCompleted){
                percent=100;
            }
            percent += delta*speed; 
            requestAnimationFrameID = requestAnimationFrame(doAnim); 
            //console.log(Math.floor(percent))  
        }  
    }
  }
function getAuthAPI() {
    return axios.get(`/auth/account`);
}
function getLogoutAPI() {
    return axios.get(`/auth/logout`);
}
function getPostAPI(url,pageId) {   
    return axios.get(`/api/post/${url}/${pageId}`);
}
function deletePostAPI(url,id) {   
    return axios.delete(`/api/post/${url}/${id}`);
}
//load single posts
function getPostSingleAPI(category,postId){
    return axios.get(`/api/post/single/${category}/${postId}`);
}
//load category posts
function getPostCategoryAPI(category){
    return axios.get(`/api/post/${category}`);
}
// load old posts
function getOldPostAPI(category,listType,id) {
    return axios.get(`/api/post/${category}/${listType}/${id}`);
}
//save starred post
function savePostStarAPI(postId){
    return axios.post(`/api/post/star/${postId}`);
}
//save post
function savePostAPI(data) {
    return axios.post(`/api/post`,data);
}
//update post
function updatePostAPI(data,id) {
    return axios.put(`/api/post/${id}`,data);
}
// save thumb
function thumbUpload(data){
    return axios.post('/api/images/thumb',data)
}
//delete thumb
function thumbDelete(filename){
    return axios.delete(`/api/images/thumb/${filename}`);
}
// save gif
function gifUpload(data){
    return axios.post('/api/images/thumb',data)
}
//delete gif
function gifDelete(filename){
    return axios.delete(`/api/images/thumb/${filename}`);
}
// save files
function fileUpload(data){
    return axios.post('/api/images',data)
}
// delete files
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
//인증
export const getAuth = ({type}) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return getAuthAPI().then(
        (response) => {
            if(response.data.user){
                dispatch({
                    type: actionType.SUCCESS,
                    payload: response
                })
            }else{
                dispatch({
                    type: actionType.FAILURE,
                    payload: response
                })
            }
        }
    )   
}
//로그아웃
export const getAuthLogout = ({type}) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return getLogoutAPI().then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload: response
            })
        }
    )   
}
//포스트글 저장
export const savePost = ({data,type}) => dispatch => {   
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return savePostAPI(data).then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload: response
            })
        }
    )   
}
//포스트글 update
export const updatePost = ({data,type,id}) => dispatch => {   
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return updatePostAPI(data,id).then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload: response
            })
        }
    )   
}
//포스트글 전부 불러오기
export const getPost = ({type,url,pageId}) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return getPostAPI(url,pageId).then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload: response
            })
        }
    )   
}
//delete post
export const deletePost = ({type,url,id,index}) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return deletePostAPI(url,id).then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload:{
                    response,
                    index:index
                } 
                
            })
        }
    )   
}
//개별 포스트글 불러오기
export const getSinglePost = (type,category,postId) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return getPostSingleAPI(category,postId).then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload: response
            })
        }
    )
}
//load category posts
export const getCategoryPost = (type,category) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return getPostCategoryAPI(category).then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload: response
            })
        }
    )
}
//old posts
export const getOldPost = ({type,category,listType,id}) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return getOldPostAPI(category,listType,id).then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload: response
            })
        }
    )   
}

//썸네일 이미지 업로드 
export const postThumb=({file,name,type,writeType})=>dispatch=>{
    let data = new FormData();
        data.append("thumb",file);
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return thumbUpload(data).then(
        (response)=>{
            dispatch({
                type: actionType.SUCCESS,
                payload:response,
                writeType:writeType
            })
        }
    )
}
//썸네일 이미지 지우기
export const deleteThumb=({filename,type,writeType})=>dispatch=>{   
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return thumbDelete(filename).then(
        (response)=>{
            dispatch({
                type: actionType.SUCCESS,
                payload:response,
                writeType:writeType            
            })
        }
    )
}
//save gif 
export const postGif=({file,name,type,writeType})=>dispatch=>{
    let data = new FormData();
        data.append("thumb",file);
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return gifUpload(data).then(
        (response)=>{
            dispatch({
                type: actionType.SUCCESS,
                payload:response,
                writeType:writeType
            })
        }
    )
}
//delete gif
export const deleteGif=({filename,type,writeType})=>dispatch=>{   
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return gifDelete(filename).then(
        (response)=>{
            dispatch({
                type: actionType.SUCCESS,
                payload:response,
                writeType:writeType                   
            })
        }
    )
}
//포스트 이미지 불러오기   
export const postFiles=({files,name,type,writeType})=>dispatch=>{
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
                writeType:writeType
            })
        }
    )
}
//포스트 이미지 지우기
export const deleteFiles=({index,filename,type,writeType})=>dispatch=>{
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return fileDelete(filename).then(
        (response)=>{
            dispatch({
                type: actionType.SUCCESS,
                payload:{
                    response,
                    index:index,
                },
                writeType:writeType
            })
        }
    )
}
//give star
export const saveStar=({postId,index,type})=>dispatch=>{
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return savePostStarAPI(postId).then(
        (response)=>{
            dispatch({
                type: actionType.SUCCESS,
                payload:{
                    response,
                    index:index
                },
            })
        }).catch((error) => {
            dispatch({
                type: actionType.FAILURE,
                payload:{
                    error:error.response.data.code
                }
            });
        });
}
