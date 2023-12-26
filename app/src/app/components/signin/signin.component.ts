import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignService } from 'src/app/services/sign.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signinForm!:FormGroup
  users:User[]=[]
  loggedIn:boolean=false
  constructor(private router:Router,private fromBuilder:FormBuilder,private signService:SignService ){}

  ngOnInit(){
    this.signinForm=this.fromBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required],
    })
  }

  signin(){
    this.signService.sigin().subscribe(res=>{
      const user = res.find((anyuser:any)=>{
        return anyuser.email===this.signinForm.value.email && anyuser.password===this.signinForm.value.password
      })

      if(user){
        this.loggedIn=true
        this.router.navigateByUrl('mainPage',{state:{user:user}})
      }
      else{
        this.loggedIn=true
      }
    })
  }


}
