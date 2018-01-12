import { handleActions, createAction } from 'redux-actions';
import {pending} from 'redux/helper/pending'
import { Map,List,fromJS } from 'immutable';

//액션
const POSTS_GET='POSTS/GET';
const POSTS_DELETE='POSTS/DELETE';
const ADMIN_TITLE_WRITE = 'ADMIN/ADMIN_TITLE_WRITE';
const ADMIN_SUMMARY_WRITE = 'ADMIN/ADMIN_SUMMARY_WRITE';
const ADMIN_POST_WRITE = 'ADMIN/ADMIN_POST_WRITE';
const ADMIN_BGCOLOR_WRITE = 'ADMIN/ADMIN_BGCOLOR_WRITE';
const ADMIN_IFRAMEURL_WRITE = 'ADMIN/ADMIN_IFRAMEURL_WRITE';
const ADMIN_CATEGORY_WRITE = 'ADMIN/ADMIN_CATEGORY_WRITE';
const ADMIN_TAGS_WRITE = 'ADMIN/ADMIN_TAGS_WRITE';
const ADMIN_TAGS_DELETE = 'ADMIN/ADMIN_TAGS_DELETE';

const ADMIN_SINGLE_GET='ADMIN/ADMIN_SINGLE_GET';
const ADMIN_MODIFY = 'ADMIN/ADMIN_MODIFY';
const ADMIN_POST='ADMIN/POST';

//이미지 업로드 액션
const ADMIN_THUMB_UPLOAD='ADMIN/THUMB_UPLOAD';
const ADMIN_THUMB_DELETE='ADMIN/THUMB_DELETE';
const ADMIN_GIF_UPLOAD='ADMIN/GIF_UPLOAD';
const ADMIN_GIF_DELETE='ADMIN/GIF_DELETE';
const ADMIN_FILE_UPLOAD='ADMIN/FILE_UPLOAD';
const ADMIN_FILE_DELETE='ADMIN/FILE_DELETE';

//액션생성자
export const titleWrite = createAction(ADMIN_TITLE_WRITE);
export const summaryWrite = createAction(ADMIN_SUMMARY_WRITE);
export const bgColorWrite = createAction(ADMIN_BGCOLOR_WRITE);
export const iframeUrlWrite = createAction(ADMIN_IFRAMEURL_WRITE);
export const postCategory = createAction(ADMIN_CATEGORY_WRITE);
export const postTags = createAction(ADMIN_TAGS_WRITE);
export const deleteTag=createAction(ADMIN_TAGS_DELETE);
export const postWrite = createAction(ADMIN_POST_WRITE);
export const postModify = createAction(ADMIN_MODIFY);

//초기화
const initialState=Map({
    imageLoading:Map({
        thumbnail:Map({
            pending: false,
        }),
        gif:Map({
            pending: false,
        }),
        files:Map({
            pending: false,
        }),
    }),
    listData:Map({
        pending: false,
        error: -1,
        state:'',
        lastPosts:false,
        page:1,
        pages:List([]),
        total:0,
        pageLast:0,
        firstPages:false,
        prevPages:false,
        nextPages:false,
        lastPages:false,
        data: List([]),
        starred:Map({
            pending: false,
            error: -1,
            state:'',
        }),
        oldPosts:Map({
            pending: false,
            error: -1,
            state:'',
        }),
        delPosts:Map({
            pending: false,
            error: -1,
            state:'',
        }),
    }),
    createData:Map({
        pending: false,
        error: -1,
        save:false,
        data:Map({
                postDate:'',
                title:'',
                summary:'',
                body:'',
                thumbnail:Map({
                    data: Map({}),
                }),
                gif:Map({
                    data: Map({}),
                }),
                files:Map({
                    data: List([]),
                }),
                iframeUrl:'',
                bgColor:'',
                category:'',
                tags:List([])
            }),
    }),
    modifyData:Map({
        pending: false,
        error: -1,
        data:Map({
                postDate:'',
                title:'',
                summary:'',
                body:'',
                thumbnail:Map({
                    data: Map({}),
                }),
                gif:Map({
                    data: Map({}),
                }),
                files:Map({
                    data: List([]),
                }),
                iframeUrl:'',
                bgColor:'',
                category:'',
                tags:List([])
            }),
    })
})
//리듀서
export default handleActions({
    [ADMIN_TITLE_WRITE]: (state, action) => {  
        const {writeType,title} = action.payload;
        if(writeType==='write'){
            return state.setIn(['createData','data','title'],title)
        }else{
            return state.setIn(['modifyData','data','title'],title)
        }
    },
    [ADMIN_SUMMARY_WRITE]: (state, action) => {  
        const {writeType,summary} = action.payload;
        if(writeType==='write'){
            return state.setIn(['createData','data','summary'],summary)
        }else{
            return state.setIn(['modifyData','data','summary'],summary)
        }
    },
    [ADMIN_POST_WRITE]: (state, action) => {  
        const {writeType,body} = action.payload;
        if(writeType==='write'){
            return state.setIn(['createData','data','body'],body)
        }else{
            return state.setIn(['modifyData','data','body'],body)
        }
    },
    [ADMIN_BGCOLOR_WRITE]: (state, action) => {  
        const {writeType,bgColor} = action.payload;
        if(writeType==='write'){
            return state.setIn(['createData','data','bgColor'],bgColor)
        }else{
            return state.setIn(['modifyData','data','bgColor'],bgColor)
        }
    },
    [ADMIN_IFRAMEURL_WRITE]: (state, action) => {  
        const {writeType,iframeUrl} = action.payload;
        if(writeType==='write'){
            return state.setIn(['createData','data','iframeUrl'],iframeUrl)
        }else{
            return state.setIn(['modifyData','data','iframeUrl'],iframeUrl)
        }
    },
    [ADMIN_CATEGORY_WRITE]: (state, action) => {  
        const {writeType,category} = action.payload;
        if(writeType==='write'){
            return state.setIn(['createData','data','category'],category)
        }else{
            return state.setIn(['modifyData','data','category'],category)
        }
    },
    [ADMIN_TAGS_WRITE]: (state, action) => {  
        const {writeType,tags} = action.payload;
        if(writeType==='write'){
            const tagsArr = state.getIn(['createData','data','tags']);
            return state.setIn(['createData','data','tags'],tagsArr.push(tags));
        }else{
            const tagsArr = state.getIn(['modifyData','data','tags']);
            return state.setIn(['modifyData','data','tags'],tagsArr.push(tags));
        }
    },
    [ADMIN_TAGS_DELETE]: (state, action) => {  
        const {writeType,index} = action.payload;
        if(writeType==='write'){
            const tagsArr = state.getIn(['createData','data','tags']);
            return state.setIn(['createData','data','tags'],tagsArr.splice(index,1));
        }else{
            const tagsArr = state.getIn(['modifyData','data','tags']);
            return state.setIn(['modifyData','data','tags'],tagsArr.splice(index,1));
        }
    },
    ...pending({
        type:POSTS_GET,
        name:['listData'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            let firstPages=false;
            let prevPages=false;
            let nextPages=false;
            let lastPages=false;
            let pages=[];
            let n=Math.floor(Number(data.page)/10);
            n=(Number(data.page)===10*n)?n-1:n;
            let start=10*n;
            let pageLength=data.pages>10?10:data.pages
            for(let i=0; i< pageLength; i++){
                pages.push({pageNum:i+start+1})
                    if(Number(data.page)>1){
                        firstPages=true;
                        prevPages=true;
                        nextPages=true;
                        lastPages=true
                    }else{
                        firstPages=false;
                        prevPages=false;
                        nextPages=true;
                        lastPages=true;
                    }
                    if(Number(data.page)===data.pages){
                        if(data.pages===1){
                            firstPages=false;
                            prevPages=false;
                            nextPages=false;
                            lastPages=false;
                        }else{
                            firstPages=true;
                            prevPages=true;
                            nextPages=false;
                            lastPages=false;
                        }
                    }
            }
            return state.setIn(['listData','data'],data.docs)
                        .setIn(['listData','page'],Number(data.page)) 
                        .setIn(['listData','pages'],pages) 
                        .setIn(['listData','pageLast'],data.pages) 
                        .setIn(['listData','total'],data.total)
                        .setIn(['listData','firstPages'],firstPages)
                        .setIn(['listData','prevPages'],prevPages)
                        .setIn(['listData','nextPages'],nextPages)
                        .setIn(['listData','lastPages'],lastPages)                     
        }
    }),
    //delete post
    ...pending({
        type:POSTS_DELETE,
        name:['listData','delPosts'],
        successResult:(state,action)=>{
            const {index}=action.payload;
            const postsArr = fromJS(state.getIn(['listData','data']));
            return state.setIn(['listData','data'],postsArr.splice(index,1))            
        }
    }),
    //save post
    ...pending({
        type:ADMIN_POST,
        name:['createData'],
        successResult:(state,action)=>{
            return state.setIn(['createData','pending'],false)
                        .setIn(['createData','data'],initialState.getIn(['createData','data']))
                        .setIn(['createData','save'],true)
        }
    }),
    //save modify post
    ...pending({
        type:ADMIN_MODIFY,
        name:['modifyData'],
        successResult:(state,action)=>{
            return state.setIn(['modifyData','pending'],false)
        }
    }),
    //수정 포스트 불러오기
    ...pending({
        type:ADMIN_SINGLE_GET,
        name:['modifyData'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            return state.setIn(['modifyData','data'],fromJS(data));
        }
    }),
    //썸네일 이미지 업로드
    ...pending({
        type:ADMIN_THUMB_UPLOAD,
        name:['imageLoading','thumbnail'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            if(action.writeType==="write"){
                return state.setIn(['createData','data','thumbnail','data'],data);
            }else{
                return state.setIn(['modifyData','data','thumbnail','data'],data);
            }
        }
    }),
    //썸네일 이미지 지우기
    ...pending({
        type:ADMIN_THUMB_DELETE,
        name:['imageLoading','thumbnail'],
        successResult:(state,action)=>{
            if(action.writeType==="write"){
                return state.setIn(['createData','data','thumbnail','data'],'');
            }else{
                return state.setIn(['modifyData','data','thumbnail','data'],'');
            }
        }
    }),
    //GIF 이미지 업로드
    ...pending({
        type:ADMIN_GIF_UPLOAD,
        name:['imageLoading','gif'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            if(action.writeType==="write"){
                return state.setIn(['createData','data','gif','data'],data);
            }else{
                return state.setIn(['modifyData','data','gif','data'],data);
            }
        }
    }),
    //GIF 이미지 지우기
    ...pending({
        type:ADMIN_GIF_DELETE,
        name:['imageLoading','gif'],
        successResult:(state,action)=>{
            if(action.writeType==="write"){
                return state.setIn(['createData','data','gif','data'],'');
            }else{
                return state.setIn(['modifyData','data','gif','data'],'');
            }
        }
    }),
    //포스트 이미지 업로드
    ...pending({
        type:ADMIN_FILE_UPLOAD,
        name:['imageLoading','files'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            if(action.writeType==="write"){
                const fileArr = state.getIn(['createData','data','files','data']);
                return state.setIn(['createData','data','files','data'],fileArr.concat(data));
            }else{
                const fileArr = state.getIn(['modifyData','data','files','data']);
                return state.setIn(['modifyData','data','files','data'],fileArr.concat(data));
            }
        }
    }),
    //포스트 이미지 지우기
    ...pending({
        type:ADMIN_FILE_DELETE,
        name:['imageLoading','files'],
        successResult:(state,action)=>{
            const {index}=action.payload;
            if(action.writeType==="write"){
                const fileArr = state.getIn(['createData','data','files','data']);
                return state.setIn(['createData','data','files','data'],fileArr.splice(index,1));
            }else{
                const fileArr = state.getIn(['modifyData','data','files','data']);
                return state.setIn(['modifyData','data','files','data'],fileArr.splice(index,1));
            }
        }
    }),
    
    
}, initialState);