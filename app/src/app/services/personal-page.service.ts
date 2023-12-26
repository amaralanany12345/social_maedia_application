import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { PersonalPage } from '../personal-page';
import { Post } from '../post';

@Injectable({
  providedIn: 'root'
})
export class PersonalPageService {
  httpOptions
  constructor(private htttpClient:HttpClient)  {
    this.httpOptions={
      headers: new HttpHeaders({
        'content-Type':'application/json',
        // Authorization:"my-auth-token"   
      }),
    }
   }

   addPersonalPage(newPersonalPage:PersonalPage):Observable<PersonalPage>{
    return this.htttpClient.post<PersonalPage>(` http://localhost:3000/personalPage`,JSON.stringify(newPersonalPage),this.httpOptions)
    .pipe(
      retry(2),
      catchError((err:any)=>{
        console.error(err)
        return throwError(()=> new Error('post error'))
      })
    )
  }
  
  updatePersonalPage(updatedPersonalPage:PersonalPage,personalPageId:number):Observable<PersonalPage>{
     return this.htttpClient.patch<PersonalPage>(`http://localhost:3000/personalPage/${personalPageId}`,JSON.stringify(updatedPersonalPage),this.httpOptions)
     .pipe(
       retry(2),
       catchError((err:any)=>{
         console.error(err)
         return throwError(()=> new Error('post error'))
       })
     )
   }
   
   getPersonalPage(personalPageEmail:string):Observable<PersonalPage[]>{
    return this.htttpClient.get<PersonalPage[]>(`http://localhost:3000/personalPage?email=${personalPageEmail}`)
  }

  getOnePersonalPage(personalPageEmail:string):Observable<PersonalPage>{
    return this.htttpClient.get<PersonalPage>(`http://localhost:3000/personalPage?email=${personalPageEmail}`)
  }

  getAllPersonalPAge(personalPageEmail:string):Observable<PersonalPage[]>{
    return this.htttpClient.get<PersonalPage[]>(`http://localhost:3000/personalPage?email!=${personalPageEmail}`)
  }

  getPersonalPost(personalPageEmail:string):Observable<Post[]>{
     return this.htttpClient.get<Post[]>(`http://localhost:3000/posts?email=${personalPageEmail}`)
    }
    
  getAllPages():Observable<PersonalPage[]>{
     return this.htttpClient.get<PersonalPage[]>(`http://localhost:3000/personalPage`)

   }
}
