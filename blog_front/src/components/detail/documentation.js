import React, { Component } from 'react'
import {Link} from 'react-router-dom';
//components
import {MarkdownView} from 'components/pages';
import {Comments} from 'components/detail';

//temp
import commentsData from './commentsTemp'
export class Documentation extends Component {
  constructor(props){
    super(props);
    this.state=commentsData
  }
  render() {
      return (
        <div className={this.props.className}>
          {this.props.data.map((item,i)=>{
            return  <div key="i"
                        className="detail-contents"
                    >
                        <div className="header">
                            <span className="category">{item.category}</span>
                            <h2>{item.title}</h2>
                            <span className="date">{item.postDate}</span>
                            <p>{item.summary}</p>
                        </div>
                        <div className="tags-wrap">
                        <ul>
                            {item.tags.map((tagsItem,i)=>{
                                return (
                                    <li key={i}>
                                        <Link to={`/search/tags/${tagsItem}`}>{tagsItem}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                        </div>
                        <div className="body">   
                            <h3 className="title">Documentation</h3> 
                            <MarkdownView source={item.body}/>
                        </div>
                        <Comments
                            writeComments={this.props.writeComments}
                            commentsData={this.state.commentsData}
                            commentsText={this.props.commentsText}
                            commentsOnChange={this.props.commentsOnChange}
                        />
                    </div>
          })}
        </div>
      )}

}

export default Documentation
