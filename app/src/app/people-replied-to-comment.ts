import { User } from "./user"

export interface PeopleRepliedToComment {
    user:User,
    reply:string,
    userLikedReply:User[],
    numOfReplyLike:number,
    
}
