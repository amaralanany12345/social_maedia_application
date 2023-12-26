import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/post';
import { PostService } from 'src/app/services/post.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  newPost:Post={} as Post
  constructor(private router:Router,private postService:PostService,private location:Location){}

  ngOnInit(): void {
    this.newPost=history.state.post
  }

  editPost(){
    this.postService.editThePost(this.newPost,this.newPost.id,this.newPost.email).subscribe(newpost=>{
      this.newPost=newpost
      this.location.back()
    })
  }

}
