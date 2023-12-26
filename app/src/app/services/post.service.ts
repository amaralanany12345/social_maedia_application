import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, throwError } from 'rxjs';
import { Post } from '../post';
import { catchError } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  httpOptions
  constructor(private httpClient:HttpClient) {
    this.httpOptions={
      headers: new HttpHeaders({
        'content-Type':'application/json',
        // Authorization:"my-auth-token"   
      }),
    }
   }

   addPost(newPost:Post):Observable<Post>{
    return this.httpClient.post<Post>(`http://localhost:3000/posts`,JSON.stringify(newPost),this.httpOptions)
      .pipe(
        retry(2),
        catchError((err:any)=>{
          console.error(err)
          return throwError(()=>new Error ('post error'))
        })
    )
   }

   getAllPosts():Observable<Post[]>{
    return this.httpClient.get<Post[]>(`http://localhost:3000/posts`)
  }
  
  getPeopleLikedThePost(email:string):Observable<Post[]>{
    return this.httpClient.get<Post[]>(`http://localhost:3000/posts?email=${email}`)
   }
   
   getSavedPost(user:User):Observable<Post[]>{
    return this.httpClient.get<Post[]>(`http://localhost:3000/posts?userSaved=${user}`)
   }

   updateThePost(updatedPost:Post,postId:number):Observable<Post>{
    return this.httpClient.patch<Post>(`http://localhost:3000/posts/${postId}`,JSON.stringify(updatedPost),this.httpOptions)
    .pipe(
      retry(2),
      catchError((err:any)=>{
        console.error(err)
        return throwError(()=> new Error('post error'))
      })
    )
   }

   editThePost(updatedPost:Post,postId:number,postedEmail:string):Observable<Post>{
    return this.httpClient.patch<Post>(`http://localhost:3000/posts/${postId}?email=${postedEmail}`,JSON.stringify(updatedPost),this.httpOptions)
    .pipe(
      retry(2),
      catchError((err:any)=>{
        console.error(err)
        return throwError(()=> new Error('post error'))
      })
    )
   }

   deletePost(postId:number):Observable<Post>{
    return this.httpClient.delete<Post>(`http://localhost:3000/posts/${postId}`)
   }

}
