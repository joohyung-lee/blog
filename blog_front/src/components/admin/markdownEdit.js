import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarkdownView from 'components/common/markdown'
class MarkdownEdit extends Component {  
    constructor(props){
        super(props);
        this.state={
            isPressed:false,
            initialPos:'',
            initialWidth:'',
            offsetX:''

        }
    }
    componentDidMount(){
        window.addEventListener('mousemove',this.handleMove);
        window.addEventListener('mouseup',this.handleUp);
        this.refs.contents.style.height=`${window.innerHeight-40}px`;
        this.refs.textBox.style.width=`${window.innerWidth/2.5-40}px`;
    }
    componentWillUnmount(){
        window.removeEventListener('mousemove',this.handleMove);
        window.removeEventListener('mouseup',this.handleUp);
    }
   handleDown=(e)=>{      
        const textBox=this.refs.textBox;
        const initialWidth=textBox.offsetWidth;
        this.setState({
            isPressed:true,
            initialPos:e.clientX,
            initialWidth:initialWidth
        });
   }
   handleMove=(e)=>{
        const {isPressed,initialPos,initialWidth}=this.state;
        if(isPressed){
            const resizeWidth=e.clientX+initialWidth-initialPos;
            this.setState({
                isPressed:true,
                offsetX:resizeWidth
            });
        }
   }
   handleUp=()=>{
        this.setState({
            isPressed:false
        })
   }
    render() {
        const { source } = this.props;
        const{offsetX}=this.state;
        return (
            <div className="mirror-wrap" ref="contents">
                <div className="mirror edit">
                    <textarea type="text"
                        ref="textBox"
                        value={source}
                        onChange={this.props.handleChange}
                        placeholder="내용을 입력해주세요"
                        style={{
                            width:offsetX,

                        }}
                        />
                </div>
                <span className="resize-controll" onMouseDown={this.handleDown}></span>
                <div className="mirror markdown">
                    <MarkdownView source={this.props.source}/>
                </div>
            </div>
        );
    }
}

MarkdownEdit.propTypes = {

};

export default MarkdownEdit;