export interface Comment {
    post:string,
    email:string,
    postOwnerEmail:string,
    username:string,
    date:Date,
    id:number,
    numOfCommentLikes:number,
    peopleAreLiked:any[],
    replies:any[]
    comment:string
}
