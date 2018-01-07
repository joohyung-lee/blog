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
    //this.state=commentsData
  }
  render() {
      const {data}= this.props;
      return (
        <div className={this.props.className}>
            <div key="i"
                className="detail-contents"
            >
                <div className="header">
                    <span className="category">{data.category}</span>
                    <h2>{data.title}</h2>
                    <span className="date">{data.postDate}</span>
                    <p>{data.summary}</p>
                </div>
                <div className="tags-wrap">
                <ul>
                    {data.tags.map((tagsdata,i)=>{
                        return (
                            <li key={i}>
                                <Link to={`/search/tags/${tagsdata}`}>{tagsdata}</Link>
                            </li>
                        )
                    })}
                </ul>
                </div>
                <div className="body">   
                    <h3 className="title">Documentation</h3> 
                    <MarkdownView source={data.body}/>
                </div>
                <Comments
                    {...this.props}
                />
            </div>
        </div>
      )}

}

export default Documentation
