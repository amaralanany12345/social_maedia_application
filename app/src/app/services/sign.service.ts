import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  httpOptions
  constructor(private httpClient:HttpClient) {
    this.httpOptions={
      headers: new HttpHeaders({
        'content-Type':'application/json',
        // Authorization:"my-auth-token"   
      }),
    }
   }

  sigin():Observable<User[]>{
    return this.httpClient.get<User[]>(`http://localhost:3000/users`)
  }

  getUser(userEmail:string):Observable<User[]>{
    return this.httpClient.get<User[]>(`http://localhost:3000/users?email=${userEmail}`)

  }

  signUp(newUser:User):Observable<User>{
    return this.httpClient.post<User>(`http://localhost:3000/users`,JSON.stringify(newUser),this.httpOptions)
    .pipe(
      retry(2),
      catchError((err:any)=>{
        console.error(err)
        return throwError(()=>new Error ('post error'))
      })
    )
  }

}
