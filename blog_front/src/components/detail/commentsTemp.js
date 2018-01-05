const commentsData={
        "commentsData":[
            {
                "postId": 1,
                "id": 1,
                "userName": "joohyung",
                "body": "댓글 내용이다아",
                "reply":[
                    {
                        "postId": 1,
                        "id": 2,
                        "userName": "username",
                        "body": "대댓글 내용이다아"
                    },
                    {
                        "postId": 1,
                        "id": 3,
                        "userName": "username",
                        "body": "대댓글 내용이다아"
                    },
                ]
            },
            {
                "postId": 1,
                "id": 4,
                "userName": "joomation",
                "body": "댓글 내용이다아222222"
            },
        ]
    }
// let test=commentsData.commentsData.map((item,i)=>{
//     const index=item.userName.indexOf("joohyung");
//     if(index>-1){
//         return item.userName
//     }else{
//         return ''
//     }
// })
// console.log(test)

export default commentsData;