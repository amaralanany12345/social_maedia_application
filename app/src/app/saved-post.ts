import { Post } from "./post";
import { User } from "./user";

export interface SavedPost {
    
    user:User
    post:Post,
    // id:number
}
