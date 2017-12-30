import React, { Component } from 'react'
import {Link} from 'react-router-dom';
//components
import {MarkdownView} from 'components/pages';
import {Comments} from 'components/detail';
export class Documentation extends Component {
  constructor(props){
    super(props);
    this.state={
      commentsData:[//임시 테스트
        {
            "postId": 1,
            "id": 1,
            "userName": "LEE",
            "body": "댓글 내용이다아",
            reply:[
                {
                    "postId": 1,
                    "id": 2,
                    "userName": "reply",
                    "body": "댓글 내용이다아"
                },
                {
                    "postId": 1,
                    "id": 3,
                    "userName": "reply",
                    "body": "댓글 내용이다아"
                },
            ]
        },
        {
            "postId": 1,
            "id": 4,
            "userName": "JOO",
            "body": "댓글 내용이다아"
        },
    ]
    }
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
                            commentsData={this.state.commentsData}
                        />
                    </div>
          })}
        </div>
      )}

}

export default Documentation
