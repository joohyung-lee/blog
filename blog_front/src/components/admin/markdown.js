import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Remarkable from 'remarkable';
import hljs from 'highlight.js';
import 'styles/markdown/index.scss';
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
    rawMarkup=()=>{
       const { source } = this.props;
        var md = new Remarkable('full', {
        html:         true,        // Enable HTML tags in source
        xhtmlOut:     false,        // Use '/' to close single tags (<br />)
        breaks:       false,        // Convert '\n' in paragraphs into <br>
        langPrefix:   'language-',  // CSS language prefix for fenced blocks
        linkify:      true,         // autoconvert URL-like texts to links
        linkTarget:   '',           // set target to open link in

        // Enable some language-neutral replacements + quotes beautification
        typographer:  false,

        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
        quotes: '“”‘’',

        // Highlighter function. Should return escaped HTML,
        // or '' if input not changed
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {}
            }

            try {
            return hljs.highlightAuto(str).value;
            } catch (__) {}

            return ''; // use external default escaping
        }
        });
        var rawMarkup = md.render(source);
        
		return {
			__html: rawMarkup
		}
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
                    <div className="markdown-body" dangerouslySetInnerHTML={this.rawMarkup()}></div>
                </div>
            </div>
        );
    }
}

MarkdownEdit.propTypes = {

};

export default MarkdownEdit;