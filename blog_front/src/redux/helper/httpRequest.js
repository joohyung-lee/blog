import axios from 'axios';
//auth -v admin  
function getAdminAuthAPI() {
    return axios.get(`/auth/admin/account`);
}  
//save post -v admin
function savePostAPI(data) {
    return axios.post(`/api/post`,data);
}
//get posts -v admin
function getPostAPI(pageId) {   
    return axios.get(`/api/post/admin/${pageId}`);
}
//search posts -v admin
function getSearchPostAPI(title,pageId) {   
    return axios.get(`/api/post/search/${title}/${pageId}`);
}
//delete post -v admin
function deletePostAPI(id) {   
    return axios.delete(`/api/post/admin/${id}`);
}
//update post -v admin
function updatePostAPI(data,id) {
    return axios.put(`/api/post/${id}`,data);
}
// save thumb -v admin
function thumbUpload(data){
    return axios.post('/api/images/thumb',data)
}
//delete thumb -v admin
function thumbDelete(filename){
    return axios.delete(`/api/images/thumb/${filename}`);
}
// save gif -v admin
function gifUpload(data){
    return axios.post('/api/images/videos',data)
}
//delete gif -v admin
function gifDelete(filename){
    return axios.delete(`/api/images/videos/${filename}`);
}
// save files -v admin
function fileUpload(data){
    return axios.post('/api/images',data)
}
// delete files -v admin
function fileDelete(filename){
    return axios.delete(`/api/images/${filename}`);
}
//-------------------------admin end

//auth
function getAuthAPI() {
    return axios.get(`/auth/account`);
}
//logout
function getLogoutAPI() {
    return axios.get(`/auth/logout`);
}
//load category posts
function getPostCategoryAPI(category){
    return axios.get(`/api/post/list/${category}`);
}
//load single posts
function getPostSingleAPI(category,postId){
    return axios.get(`/api/post/single/${category}/${postId}`);
}
// load old posts
function getOldPostAPI(category,listType,id) {
    return axios.get(`/api/post/category/${category}/${listType}/${id}`);
}
//save comments
function writeCommentAPI(postId,data) {
    return axios.post(`/api/post/comments/original/${postId}`,data);
}
//reply comments
function replyCommentAPI(postId,index,data) {
    return axios.post(`/api/post/comments/reply/${postId}/${index}`,data);
}
//update comments
function updateCommentAPI(postId,data,index,replyIndex) {
    return axios.put(`/api/post/comments/${postId}/${index}/${replyIndex}`,data);
}

//delete comments
function deleteCommentsAPI(view,id,index,replyIndex) {   
    return axios.delete(`/api/post/comments/${view}/${id}/${index}/${replyIndex}`);
}
//load starred post
function loadPostStarAPI(userId){
    return axios.get(`/api/post/starlist/${userId}`)
}
//save starred post
function savePostStarAPI(postId){
    return axios.post(`/api/post/star/${postId}`);
}
//search posts
function getSearchPostsAPI(searchKeyword){
    return axios.get(`/api/post/main/search/posts/${searchKeyword}`);
}
//search tags in posts
function getSearchTagsAPI(tagsname){
    return axios.get(`/api/post/main/search/tags/${tagsname}`);
}

//pending type
const actions=(type)=>{
    return {
        PENDING : `${type}_PENDING`,
        SUCCESS : `${type}_SUCCESS`,
        FAILURE : `${type}_FAILURE`
    }
}
//auth -v admin
export const getAdminAuth = ({type}) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return getAdminAuthAPI().then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload: response
            })
        }
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:error.response.data.code,
                msg:error.response.data.error,
            }
        });
    });    
}
//save posts -v admin
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
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:error.response.data.code,
                msg:error.response.data.error,
            }
        });
    });   
}
//update post -v admin
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
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:error.response.data.code,
                msg:error.response.data.error,
            }
        });
    });   
}
//get posts -v admin
export const getPost = ({type,pageId}) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return getPostAPI(pageId).then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload: response
            })
        }
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:error.response.data.code,
                msg:error.response.data.error,
            }
        });
    });    
}
//searcn posts -v admin
export const getSearchPost = ({type,title,pageId}) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return getSearchPostAPI(title,pageId).then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload: response
            })
        }
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:error.response.data.code,
                msg:error.response.data.error,
            }
        });
    });    
}
//delete post -v admin
export const deletePost = ({type,id,index}) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return deletePostAPI(id).then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload:{
                    response,
                    index:index
                } 
                
            })
        }
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:error.response.data.code,
                msg:error.response.data.error,
            }
        });
    });    
}
//upload thumb -v admin
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
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:error.response.data.code,
                msg:error.response.data.error,
            }
        });
    }); 
}
//delete thumb -v admin
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
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:error.response.data.code,
                msg:error.response.data.error,
            }
        });
    }); 
}
//save gif -v admin
export const postGif=({file,name,type,writeType})=>dispatch=>{
    let data = new FormData();
        data.append("video",file);
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
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:error.response.data.code,
                msg:error.response.data.error,
            }
        });
    }); 
}
//delete gif -v admin
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
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:error.response.data.code,
                msg:error.response.data.error,
            }
        });
    }); 
}
//save posts images -v admin
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
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:error.response.data.code,
                msg:error.response.data.error,
            }
        });
    }); 
}
//delete posts images -v admin
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
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:error.response.data.code,
                msg:error.response.data.error,
            }
        });
    }); 
}
//----------------------------admin end
//auth
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
//logout
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
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:error.response.data.code,
                msg:error.response.data.error,
            }
        });
    });    
}

//load single post
export const getSinglePost = (type,category,postId) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return getPostSingleAPI(category,postId).then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload: {
                    data:response.data[0]
                }
            })
        }
    ).catch((error) => {
        
        dispatch({
            type: actionType.FAILURE,
            payload:error
        });
    }); 
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
    ).catch((error) => {
        
    }); 
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
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:error.response.data.code,
                msg:error.response.data.error,
            }
        });
    });    
}

//write commments
export const writeComments=({postId,data,type})=>dispatch=>{
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return writeCommentAPI(postId,data).then(
        (response)=>{
            dispatch({
                type: actionType.SUCCESS,
                payload:{
                    data:response.data
                },
            })
        }).catch((error) => {
            dispatch({
                type: actionType.FAILURE,
                payload:{
                    error:'Failure Comment'
                }
            });
        });
}
//reply commments
export const replyComments=({postId,index,data,type})=>dispatch=>{
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return replyCommentAPI(postId,index,data).then(
        (response)=>{
            dispatch({
                type: actionType.SUCCESS,
                payload:{
                    data:response.data,
                    index:index
                },
            })
        }).catch((error) => {
            dispatch({
                type: actionType.FAILURE,
                payload:{
                    error:error
                }
            });
        });
}
//update commments
export const updateComments=({postId,data,index,replyIndex,type})=>dispatch=>{
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return updateCommentAPI(postId,data,index,replyIndex).then(
        (response)=>{
            dispatch({
                type: actionType.SUCCESS,
                payload:{
                    data:response.data,
                    
                },
            })
        }).catch((error) => {
            dispatch({
                type: actionType.FAILURE,
                payload:{
                    error:error.response.code
                }
            });
        });
}
//delete commments
export const deleteComments = ({view,type,id,index,replyIndex}) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return deleteCommentsAPI(view,id,index,replyIndex).then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload:{
                    data:response.data,
                } 
                
            })
        }
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:0,
                msg:'Delete Failure',
            }
        });
    });    
}
//load star
export const loadStar=({type,userId})=>dispatch=>{
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return loadPostStarAPI(userId).then(
        (response)=>{
            dispatch({
                type: actionType.SUCCESS,
                payload:response
            })
        }).catch((error) => {
            dispatch({
                type: actionType.FAILURE,
                payload:{
                    error:error
                }
            });
        });
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
//searcn posts tags
export const getSearchPosts = ({type,searchKeyword}) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return getSearchPostsAPI(searchKeyword).then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload: response
            })
        }
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:1
            }
        });
    });
}
//searcn posts tags
export const getSearchTags = ({type,tagsname}) => dispatch => {    
    const actionType=actions(type);
    dispatch({type: actionType.PENDING});
    return getSearchTagsAPI(tagsname).then(
        (response) => {
            dispatch({
                type: actionType.SUCCESS,
                payload: response
            })
        }
    ).catch((error) => {
        dispatch({
            type: actionType.FAILURE,
            payload:{
                error:1
            }
        });
    });
}