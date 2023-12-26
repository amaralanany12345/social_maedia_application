import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PersonalPage } from 'src/app/personal-page';
import { Post } from 'src/app/post';
import { PersonalPageService } from 'src/app/services/personal-page.service';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.css']
})
export class PostImageComponent implements OnInit {
  mainuser:User = {} as User
  imageUrl:string=''
  newPost:Post={} as Post
  selectedFile!:File
  currentDate=new Date()
  allPersonalPage:PersonalPage[]=[]
  personalPage:PersonalPage[]=[]
  constructor(private location:Location,private personaPage:PersonalPageService){}
  ngOnInit(): void {
    this.mainuser=history.state.mainuser
    this.personaPage.getPersonalPage(this.mainuser.email).subscribe(page=>{
      this.personalPage=page
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.getPath()
  }

  getPath() {
    const reader=new FileReader()
    reader.onload=(event:any)=>{
      this.imageUrl=event.target.result
      this.personalPage[0].profileImage=this.imageUrl
      this.personaPage.updatePersonalPage(this.personalPage[0],this.personalPage[0].id).subscribe(updated=>{
        this.personalPage[0]=updated
      })
    }
    reader.readAsDataURL(this.selectedFile);
    this.location.back()
  }

}
