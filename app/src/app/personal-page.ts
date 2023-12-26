import { Post } from "./post";
import { User } from "./user";

export interface PersonalPage {
    username:string,
    email:string,
    password:String,
    profileImage:string,
    posts:Post[],
    savedPost:Post[],
    id:number,
    followers:User[],
    numOfFollowers:number,
}
