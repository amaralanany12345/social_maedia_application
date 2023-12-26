import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalPage } from 'src/app/personal-page';
import { PersonalPageService } from 'src/app/services/personal-page.service';
import { SignService } from 'src/app/services/sign.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  newUser:User={} as User
  personalPage:PersonalPage={} as PersonalPage
  constructor(private signService:SignService,private router:Router,private thePersonalPage:PersonalPageService){}

  signUp(){

    this.personalPage.email=this.newUser.email
    this.personalPage.password=this.newUser.password
    this.personalPage.username=this.newUser.username
    this.personalPage.profileImage=''
    this.personalPage.followers=[]
    this.personalPage.numOfFollowers=0
    this.personalPage.posts=[]
    this.personalPage.savedPost=[]

    this.thePersonalPage.addPersonalPage(this.personalPage).subscribe(theNewPersonalPage=>{
      this.personalPage=theNewPersonalPage
    })
    this.signService.signUp(this.newUser).subscribe(newUser=>{
      this.newUser=newUser
      this.router.navigateByUrl('mainPage',{state:{user:this.newUser}})
    })
  }

}
