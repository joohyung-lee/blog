import React, { Component, PropTypes } from 'react';
import defaultAvatar from 'images/defaultAvatar.svg';

class ModifyTxtArea extends Component {
    constructor(props){
        super(props);
        this.state={
            textareaHeight:60,
            textareaFocus:false,
            textareaActive:false,
            blank:false
        }
    }
    componentDidMount(){
        (this.props.focus)?this.refs.modifyTxtArea.focus():null;
        this.initialHeight();
    }
    textareaFocus=(e)=>{
        if(!this.props.isLogin){
            return this.props.modalView();
        }else{
            return this.setState({
                textareaHeight:e.target.clientHeight<120?120:e.target.clientHeight,
                textareaFocus:true,
                textareaActive:true,
            })
        }
    }
    textareaBlur=(e)=>{
         //check space
         let blank_pattern = /^\s+|\s+$/g;
         if(e.target.value.replace( blank_pattern, '' ) === "" ){
            this.setState({
                textareaHeight:60,
                textareaFocus:false,
                textareaActive:true,
                blank:true
            })
         }
        
    }
    textareaKeyDown=(e)=>{
        let target=e.target;
        requestAnimationFrame((e)=>{
            this.setState({
                textareaHeight:60,
                textareaActive:false,
                blank:false
            });
            this.setState({
                textareaHeight:target.scrollHeight<120?120:target.scrollHeight
            })
        })
    }
    initialHeight=()=>{
        let target=this.refs.modifyTxtArea;
        requestAnimationFrame((e)=>{
            this.setState({
                textareaHeight:60,
                textareaActive:false,
                blank:false
            });
            this.setState({
                textareaHeight:target.scrollHeight<120?120:target.scrollHeight
            })
        })
    }
    render() {
        const {textareaFocus} = this.state;
        return (
            <div className={`commentsTxtArea modify ${textareaFocus?'focus':'default'}`}>
                <div className={`avatar-info`}>
                    <p className="name">Modify</p>                                
                </div>
                <textarea type="text" placeholder="Add comment..."
                    ref="modifyTxtArea"
                    className={`${this.state.textareaActive?'animate':''}`}
                    value={this.props.replyText}
                    onChange={this.props.commentsOnChange}
                    onKeyDown={this.textareaKeyDown}
                    onFocus={this.textareaFocus}
                    onBlur={this.textareaBlur}
                    style={{
                        height:this.state.textareaHeight
                    }}
                />
                {this.props.children}
            </div>
        );
    }
}

ModifyTxtArea.propTypes = {

};

export default ModifyTxtArea;