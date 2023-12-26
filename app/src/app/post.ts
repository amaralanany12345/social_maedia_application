import { PeopleComment } from "./people-comment";
import { User } from "./user";

export interface Post {
    username:string,
    email:string,
    post:string,
    image:string,
    date:Date,
    numOfLikes:number,
    peopleAreLiked:User[],
    typeOfPost:string,
    comments:PeopleComment[],
    userSaved:User[],
    id:number,
}
