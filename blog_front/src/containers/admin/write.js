import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import * as httpRequest from 'redux/helper/httpRequest'
import dateFormat from 'dateformat';
import DefaultLoading from 'images/defaultLoading';
import { Scrollbars } from 'react-custom-scrollbars';
//config
import urlConfig from 'config/urlConfig'
//redux
import * as modalActions from 'redux/modal';
import * as adminAction from 'redux/admin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//components
import {MarkdownEdit,ImageView} from 'components/admin';
import AlertModal from 'components/common/modal/alertModal';
//error
class Write extends Component { 
    constructor(props){
        super(props);
        this.state={
            innerHeight:window.innerHeight
        }
        this.writeType=(typeof this.props.match.params.id==="undefined")?"write":"modify";
        
    }
    componentWillMount(){
        const {writeupload}=this.props;
        writeupload.getAdminAuth({
            type:'AUTH/ADMIN_PROFILE'
        })
    }
    componentDidMount(){
        const {writeupload}=this.props;
        this.dimentions();
        window.addEventListener('resize',this.dimentions);
        if(typeof this.props.match.params.id!=="undefined"){
            writeupload.getSinglePost('ADMIN/ADMIN_SINGLE_GET','write',this.props.match.params.id);
        }
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.dimentions);   
    }
    componentWillReceiveProps(nextProps) {
        const {writeLoading,modalView}=this.props;
        if(writeLoading!==nextProps.writeLoading){
            if(!nextProps.writeLoading){
                modalView.openModal({
                    modalName:'alert'
                }); 
            }
        }
    }
    dimentions=()=>{
        this.setState({
            innerHeight:window.innerHeight
        })
    }
    handleTitle=(e)=>{  
        const {input}=this.props;
        const title= e.target.value;
        return input.titleWrite({
            writeType:this.writeType,
            title:title,
        })
    }
    handleSummary=(e)=>{
        
        const {input}=this.props;
        const summary= e.target.value;
        return input.summaryWrite({
            writeType:this.writeType,
            summary:summary,
        })
    }
    handleBgcolor=(e)=>{
        const {input}=this.props;
        const bgColor= e.target.value;
        return input.bgColorWrite({
            writeType:this.writeType,
            bgColor:bgColor,
        })
    }
    handleIframeUrl=(e)=>{
        const {input}=this.props;
        const iframeUrl= e.target.value;
        return input.iframeUrlWrite({
            writeType:this.writeType,
            iframeUrl:iframeUrl,
        })
    }
    
    handleBlogType=(e)=>{
        const {input}=this.props;
        const blogType= e.target.value;
        return input.blogType({
            writeType:this.writeType,
            blogType:blogType,
        })
    }
    handleCategory=(e)=>{
        const {input}=this.props;
        const category= e.target.value;
        return input.postCategory({
            writeType:this.writeType,
            category:category,
        })
    }
    handleTag=(e)=>{
        const {input}=this.props;
        let tags=e.target.value;
        if(e.keyCode === 13){
            input.postTags({
                writeType:this.writeType,
                tags:tags
            });
            e.target.value='';
            return false;
            
        }
    }
    handleTagDelete=(i)=>{
        const {input}=this.props;
        return input.deleteTag({
            writeType:this.writeType,
            index:i
        });
            
    }
    handleChange=(e)=>{
        const {input} = this.props;
        let contents = {};
        contents= e.target.value;
        return input.postWrite({
            writeType:this.writeType,
            body:contents,
        })
    }
    handleThumbUpload=(e)=>{
        const {writeupload,thumb}=this.props;
        if(thumb.data.filename){
            writeupload.deleteThumb({
                writeType:this.writeType,
                filename:thumb.data.filename,
                type:'ADMIN/THUMB_DELETE'
            })
        }
        const file=e.target.files[0];
        writeupload.postThumb({
            writeType:this.writeType,
            file,
            name:'file',
            type:'ADMIN/THUMB_UPLOAD'
        })
    }
    handleThumbDelete=()=>{
        const {writeupload,thumb}=this.props;
        writeupload.deleteThumb({
            writeType:this.writeType,
            filename:thumb.data.filename,
            type:'ADMIN/THUMB_DELETE'
        })
    }
    handleGifUpload=(e)=>{
        const {writeupload,gif}=this.props;
        if(gif.data.filename){
            writeupload.deleteGif({
                writeType:this.writeType,
                filename:gif.data.filename,
                type:'ADMIN/GIF_DELETE'
            })
        }
        const file=e.target.files[0];
        writeupload.postGif({
            writeType:this.writeType,
            file,
            name:'file',
            type:'ADMIN/GIF_UPLOAD'
        })
    }
    handleGifDelete=()=>{
        const {writeupload,gif}=this.props;
        writeupload.deleteGif({
            writeType:this.writeType,
            filename:gif.data.filename,
            type:'ADMIN/GIF_DELETE'
        })
    }
    handleFileUpload=(e)=>{
        const {writeupload}=this.props;
        const files=e.target.files;
        
        writeupload.postFiles({
            writeType:this.writeType,
            files,
            name:'files',
            type:'ADMIN/FILE_UPLOAD'
        })
    }
    imageDelete=(i,filename)=>{
        const {writeupload}=this.props;
        writeupload.deleteFiles({
            writeType:this.writeType,
            index:i,
            filename:filename,
            type:'ADMIN/FILE_DELETE'
        })
    }
    bytesToSize=(bytes)=>{
        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)),10);
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
     };
    handleSubmit=(e)=>{      
        const {writeupload,writePost}=this.props;
        const now = new Date();
        if(this.writeType==='write'){
            writeupload.savePost({
                data:{
                    ...writePost,
                    postDate:dateFormat(now,"mmm d, yyyy")
                },
                type:'ADMIN/POST'
            })
        }else{
            writeupload.updatePost({
                data:{
                    ...writePost,
                },
                id:this.props.match.params.id,
                type:'ADMIN/ADMIN_MODIFY'
            })
        }
    }
    alertClose=()=>{
        const {modalView} = this.props;
        modalView.closeModal({
            modalName:'alert'
        }); 
    }
    render() {
        const {writePost,thumb,gif,files,writeLoading,imageLoading,modal}=this.props;
        return (
            <Scrollbars
            style={{
                height:`${this.state.innerHeight}px`,
            }}>
                <AlertModal open={modal['alert'].open} close={this.alertClose} 
                title="Success"
                msg="You have successfully posted"/>
                <div className="admin-wrapper">
                    {writeLoading?<DefaultLoading color="black"/>:null}
                    <div className="header">
                        <div className="post-title">
                            <input className="write-input" type="text" onChange={this.handleTitle} value={writePost.title} placeholder="제목을 입력해주세요"/>
                        </div>
                        <div className="bgcolor-code">
                            <input className="write-input" type="text" onChange={this.handleBgcolor} value={writePost.bgColor} placeholder="#a1b2c3"/>
                            <span className="color-box" style={{backgroundColor:writePost.bgColor}}/>
                        </div>
                        <select value={writePost.blogType} onChange={this.handleBlogType}>
                            <option value="simulate">simulate</option>
                            <option value="blog">blog</option>
                        </select>
                        <div className="iframe-url">
                            
                            <input className="write-input" type="text" onChange={this.handleIframeUrl} value={writePost.iframeUrl} placeholder="iframe주소를 입력해주세요"/>
                        </div>
                        <div className="post-category">
                            <select value={writePost.category} onChange={this.handleCategory}>
                                <option>전체</option>
                                <option value="motionlab">motionlab</option>
                                <option value="review">review</option>
                                <option value="projects">projects</option>
                            </select>
                        </div>
                        <button className="btn-save" onClick={this.handleSubmit}>Save</button>
                    </div>
                    <div className="summary">
                        <textarea type="text" rows="2" cols="50" onChange={this.handleSummary} value={writePost.summary} placeholder="summary를 입력해주세요"/>
                    </div>
                    <div className="post-tags">
                        <input className="write-input" type="text" onKeyDown={this.handleTag} placeholder="태그를 입력해주세요"/>
                        <ul>
                            {
                                writePost.tags.map((tag,i)=>{
                                    return  <li key={i}>
                                                <span>{tag}</span>
                                                <span className="btn-delete" onClick={this.handleTagDelete.bind(null,i)}>x</span>
                                            </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-flex">           
                        <div className="upload-wrap">
                            <input type="file" id="thumbname" onChange={this.handleThumbUpload}/>
                            <label className="btn-upload" htmlFor="thumbname"><span>썸네일 업로드</span></label>
                            <div className="file-preview">
                                <ul>
                                {
                                    imageLoading.thumbnail.pending?<p>로딩중</p>:
                                        thumb.data.path?
                                        <ImageView 
                                        size={this.bytesToSize(thumb.data.size)} 
                                        link={`${urlConfig.url}/api/${thumb.data.path}`}
                                        onClick={this.handleThumbDelete}
                                        />
                                        :null
                                }
                                </ul>
                            </div>
                        </div>
                        <div className="upload-wrap">
                            <input type="file" id="gifname" onChange={this.handleGifUpload} />
                            <label className="btn-upload" htmlFor="gifname"><span>Video 업로드</span></label>
                            <div className="file-preview">
                                <ul>
                                {
                                    imageLoading.gif.pending?<p>로딩중</p>:
                                        gif.data.path?
                                        <ImageView 
                                        size={this.bytesToSize(gif.data.size)} 
                                        link={`${urlConfig.url}/api/${gif.data.path}`}
                                        onClick={this.handleGifDelete}
                                        />
                                        :null
                                }
                                </ul>
                            </div>
                        </div>  
                    </div> 
                    <div className="upload-wrap post-images">
                        <input type="file" id="filesname" onChange={this.handleFileUpload} multiple />
                        <label className="btn-upload" htmlFor="filesname"><span>이미지 업로드</span></label>
                        <div className="file-preview">
                            <ul>
                                {
                                    imageLoading.files.pending?<p>로딩중</p>:
                                    files.data.map((list,i)=>{
                                        return <ImageView key={i} 
                                                size={this.bytesToSize(list.size)} 
                                                link={`${urlConfig.url}/api/${list.path}`}
                                                onClick={this.imageDelete.bind(null,i,list.filename)}
                                                />
                                    })
                                }
                            </ul>    
                        </div>    
                    </div>
                    <MarkdownEdit source={writePost.body} handleChange={this.handleChange}/>
                </div>
            </Scrollbars>
        );
    }
}
export default withRouter(connect(
    (state,props)=>{
        const{id}=props.match.params; 
        const writeType=(typeof id==="undefined")?"createData":"modifyData" 
        return{
            modal:state.modal.toJS(),
            isAuth:state.auth.getIn(['adminProfile']).toJS().error,
            writeLoading:state.admin.getIn([writeType]).toJS().pending,
            writePost:state.admin.getIn([writeType,'data']).toJS(),
            imageLoading:state.admin.getIn(['imageLoading']).toJS(),
            thumb:state.admin.getIn([writeType,'data','thumbnail']).toJS(),
            gif:state.admin.getIn([writeType,'data','gif']).toJS(),
            files:state.admin.getIn([writeType,'data','files']).toJS(),
            error:state.admin.getIn([writeType]).toJS().error
        }

    },
    (dispatch)=>({
        writeupload:bindActionCreators(httpRequest,dispatch),
        input: bindActionCreators(adminAction, dispatch),
        modalView:bindActionCreators(modalActions,dispatch),
    })
)(Write));