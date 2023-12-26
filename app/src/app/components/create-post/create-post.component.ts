import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonalPage } from 'src/app/personal-page';
import { Post } from 'src/app/post';
import { PersonalPageService } from 'src/app/services/personal-page.service';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  newPost:Post={} as Post
  user:User={} as User
  currentDate=new Date()
  allPersonalPage:PersonalPage[]=[]
  selectedFile!:File
  imageUrl:string=''
  reader=new FileReader()
  signinForm!:FormGroup
  
  constructor(private fromBuilder:FormBuilder,private router:Router,private postService:PostService,private thePersonalPage:PersonalPageService,private location:Location ){}
  
  ngOnInit(): void {
    this.user=history.state.user
    this.thePersonalPage.getPersonalPage(this.user.email).subscribe(allpersonalpage=>{
      this.allPersonalPage=allpersonalpage
    })
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.getPath()
  }

  getPath()  {    
    this.reader.onload=(event:any)=>{
      this.imageUrl=event.target.result
      this.newPost.image=this.imageUrl
    }
    this.reader.readAsDataURL(this.selectedFile);
  }

  addPost(){
    this.newPost.email=this.user.email
    this.newPost.username=this.user.username
    this.newPost.date=this.currentDate
    this.newPost.typeOfPost='posted'
    this.newPost.numOfLikes=0
    this.newPost.peopleAreLiked=[]
    this.newPost.comments=[]
    this.newPost.userSaved=[]
    this.postService.addPost(this.newPost).subscribe(theNewPost=>{
      this.newPost=theNewPost
    })
    this.location.back()
  }

}
