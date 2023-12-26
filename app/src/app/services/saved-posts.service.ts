import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Post } from '../post';
import { SavedPost } from '../saved-post';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class SavedPostsService {

  httpOptions
  constructor(private httpClient:HttpClient) {
    this.httpOptions={
      headers: new HttpHeaders({
        'content-Type':'application/json',
        // Authorization:"my-auth-token"   
      }),
    }
   }

   addSavedPost(newSavedPost:SavedPost):Observable<SavedPost>{
    return this.httpClient.post<SavedPost>(`http://localhost:3000/savedPost`,JSON.stringify(newSavedPost),this.httpOptions)
    .pipe(
      retry(2),
      catchError((err:any)=>{
        console.error(err)
        return throwError(()=>new Error ('post error'))
      })
    )
   }

   updateSavedPost(updatedSavedPost:SavedPost,savedPostId:number):Observable<SavedPost>{
    return this.httpClient.patch<SavedPost>(`http://localhost:3000/savedPost/${savedPostId}`,JSON.stringify(updatedSavedPost),this.httpOptions)
    .pipe(
      retry(2),
      catchError((err:any)=>{
        console.error(err)
        return throwError(()=>new Error ('post error'))
      })
    )
   }

   deletePostSaved(savedPostId:number):Observable<SavedPost>{
    return this.httpClient.delete<SavedPost>(`http://localhost:3000/savedPost/${savedPostId}`)
   }

   getAllSavedPosts(userEmail:string):Observable<SavedPost[]>{
    return this.httpClient.get<SavedPost[]>(`http://localhost:3000/savedPost?email=${userEmail}`)
   }
}
