import { handleActions, createAction } from 'redux-actions';
import {pending} from 'redux/helper/pending'
import { Map,List ,fromJS} from 'immutable';

//액션
const POSTS_GET='POSTS/GET';
const POSTS_DELETE='POSTS/DELETE';
const POSTS_CATEGORY_GET='POSTS/CATEGORY_GET';
const POSTS_OLD_GET='POSTS/OLD_GET';
const POSTS_SINGLE_GET='POSTS/SINGLE_GET';

const POSTS_COMMENTS_SAVE='POSTS/COMMENTS_SAVE';
const POSTS_COMMENTS_REPLY='POSTS/COMMENTS_REPLY';
const POSTS_COMMENTS_UPDATE='POSTS/COMMENTS_UPDATE';
const POSTS_COMMENTS_DELETE='POSTS/COMMENTS_DELETE';
const POSTS_COMMENTS_MODIFY='POSTS/COMMENTS_MODIFY';

const POSTS_STAR_SAVE='POSTS/STAR_SAVE';
const POSTS_STAR_CLIENT_SAVE='POSTS/STAR_CLIENT_SAVE';

const POSTS_SEARCH_STAR_SAVE='POSTS/SEARCH_STAR_SAVE';
const POSTS_SEARCH_POSTS='POSTS/POSTS_SEARCH_POSTS';
const POSTS_SEARCH_TAGS='POSTS/POSTS_SEARCH_TAGS';
const POSTS_SEARCH_VACUUM='POSTS/POSTS_SEARCH_VACUUM';
const POSTS_SEARCH_SCROLL='POSTS/POSTS_SEARCH_SCROLL';

//액션생성자
export const starSave = createAction(POSTS_STAR_CLIENT_SAVE);
export const postVacuum=createAction(POSTS_SEARCH_VACUUM);
export const postScroll=createAction(POSTS_SEARCH_SCROLL);

export const modifyComments=createAction(POSTS_COMMENTS_MODIFY);
//초기화
const initialState=Map({
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
    itemData:Map({
        pending: false,
        error: -1,
        data: Map({}),
        comments:Map({
            pending: false,
            error: -1,
            state:'',
        }),
        delComments:Map({
            pending: false,
            error: -1,
            state:'',
        }),
    }),
    searchData:Map({
        pending: false,
        error: -1,
        state:'',
        lastPosts:false,
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
        scroll:0
    }),
    tags:Map({
        pending: false,
        error: -1,
        data: List([]),
        vacuum:false
    })
    
    
})
//리듀서
export default handleActions({
    //load all posts -v admin
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
    //------------------------------------end v admin
    
    //load category posts
    ...pending({
        type:POSTS_CATEGORY_GET,
        name:['listData'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            return state.setIn(['listData','data'],data.posts)
                        .setIn(['listData','total'],data.count) 
                        .setIn(['listData','lastPosts'],false)                      
        }
    }),
    //load old 
    ...pending({
        type:POSTS_OLD_GET,
        name:['listData','oldPosts'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            const dataArr = state.getIn(['listData','data']);
            return state.setIn(['listData','data'],dataArr.concat(data))
                        .setIn(['listData','lastPosts'],(data.length<6)?true:false)
                        
        }
    }),
    //개별 포스트 불러오기
    ...pending({
        type:POSTS_SINGLE_GET,
        name:['itemData'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            return state.setIn(['itemData','data'],fromJS(data));
        }
    }),
    //WRITE COMMENTS
    ...pending({
        type:POSTS_COMMENTS_SAVE,
        name:['itemData','comments'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            return state.setIn(['itemData','data'],fromJS(data));
        }
    }),
    //REPLY COMMENTS
    ...pending({
        type:POSTS_COMMENTS_REPLY,
        name:['itemData','comments'],
        successResult:(state,action)=>{
            const {data,index}=action.payload;
            return state.setIn(['itemData','data'],fromJS(data));
        }
    }),
    //UPDATE COMMENTS
    ...pending({
        type:POSTS_COMMENTS_UPDATE,
        name:['itemData','comments'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            return state.setIn(['itemData','data'],fromJS(data));
        }
    }),
    //MODIFY COMMENTS
    [POSTS_COMMENTS_MODIFY]: (state, action) => {  
        const {index,replyIndex,body,view} = action.payload;
        if(view==='write'){
            return state.setIn(['itemData','data','comments',index,'body'],body);
        }else{
            return state.setIn(['itemData','data','comments',index,'reply',replyIndex,'body'],body);
        }
        
    },
    //DELETE COMMENTS
    ...pending({
        type:POSTS_COMMENTS_DELETE,
        name:['itemData','delComments'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            return state.setIn(['itemData','data'],fromJS(data));            
        }
    }),
    ...pending({
        type:POSTS_STAR_SAVE,
        name:['listData','starred'],
        successResult:(state,action)=>{
            const {response,index}=action.payload;
            const dataArr = fromJS(state.getIn(['listData','data']));
            return state.setIn(['listData','data'],dataArr.update(
                index,
                (item)=>fromJS(response.data.post)
            ));
        }
    }),
    ...pending({
        type:POSTS_SEARCH_POSTS,
        name:['searchData'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            return state.setIn(['searchData','data'],data.posts)
        }
    }),
  
    ...pending({
        type:POSTS_SEARCH_STAR_SAVE,
        name:['searchData','starred'],
        successResult:(state,action)=>{
            const {response,index}=action.payload;
            const dataArr = fromJS(state.getIn(['searchData','data']));
            return state.setIn(['searchData','data'],dataArr.update(
                index,
                (item)=>fromJS(response.data.post)
            ));
        }
    }),
    ...pending({
        type:POSTS_SEARCH_TAGS,
        name:['tags'],
        successResult:(state,action)=>{
            const {data}=action.payload;
            let tagsArray=[];
            data.posts.map((item,i)=>{
                return tagsArray=tagsArray.concat(item.tags);
            });
            if(state.getIn(['tags','vacuum'])){
                return state.setIn(['tags','data'],[])
            }else{
                return state.setIn(['tags','data'],tagsArray)
            }
        }
    }),
    [POSTS_SEARCH_VACUUM]:(state,action)=>{
        const {vacuum}=action.payload;
        return state.setIn(['tags','vacuum'],vacuum);
    },
    [POSTS_SEARCH_SCROLL]:(state,action)=>{
        const {scroll}=action.payload;
        return state.setIn(['searchData','scroll'],scroll);
    }
    
}, initialState);