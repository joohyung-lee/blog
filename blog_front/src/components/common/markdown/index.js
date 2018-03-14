import React, { Component } from 'react';
import Remarkable from 'remarkable';
import hljs from 'highlight.js';

class MarkdownView extends Component {
    componentDidMount(){
        let root=document.querySelector('#root');
        let cover=root.querySelector('.cover');
        let images=root.querySelectorAll('.back-img');
        if(images){
            [].forEach.call(images, function(item,i) {
                let img = new Image();
                img.onload = (function(i) {
                   item.classList.add('active');
                  })(i);
              });
        }
    }
    rawMarkup=()=>{
        const { source } = this.props;
         var md = new Remarkable('full', {
         html:         true,        // Enable HTML tags in source
         xhtmlOut:     false,        // Use '/' to close single tags (<br />)
         breaks:       false,        // Convert '\n' in paragraphs into <br>
         langPrefix:   'hljs\ ',  // CSS language prefix for fenced blocks
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
    render() {
        return (
            <div>
            <div className="markdown-body" dangerouslySetInnerHTML={this.rawMarkup()}></div>
            </div>
        );
    }
}

export default MarkdownView;