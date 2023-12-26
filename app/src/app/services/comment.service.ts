import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Comment } from 'src/app/comment';
import { Post } from '../post';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  httpOptions
  constructor(private httpClient:HttpClient) {
    this.httpOptions={
      headers: new HttpHeaders({
        'content-Type':'application/json',
        // Authorization:"my-auth-token"   
      }),
    }
   }

   addComment(newComment:Comment):Observable<Comment>{
    return this.httpClient.post<Comment>(`http://localhost:3000/comments`,JSON.stringify(newComment),this.httpOptions)
    .pipe(
      retry(2),
      catchError((err:any)=>{
        console.error(err)
        return throwError(()=>new Error ('post error'))
      })
    )
   }

   getPostComment(post:any,postOwnerEmail:string):Observable<Comment[]>{
    return this.httpClient.get<Comment[]>(`http://localhost:3000/comments?post=${post}&postOwnerEmail=${postOwnerEmail}`)
   }

   updateComment(newComment:Comment,commentId:number):Observable<Comment>{
    return this.httpClient.patch<Comment>(`http://localhost:3000/comments/${commentId}`,JSON.stringify(newComment),this.httpOptions)
    .pipe(
      retry(2),
      catchError((err:any)=>{
        console.error(err)
        return throwError(()=>new Error ('post error'))
      })
    )
   }
   deleteComment(commentId:number):Observable<Comment>{
    return this.httpClient.delete<Comment>(`http://localhost:3000/comments/${commentId}`)
   }
}
