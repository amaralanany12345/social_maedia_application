import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalPage } from 'src/app/personal-page';
import { Post } from 'src/app/post';
import { SavedPost } from 'src/app/saved-post';
import { PersonalPageService } from 'src/app/services/personal-page.service';
import { PostService } from 'src/app/services/post.service';
import { SavedPostsService } from 'src/app/services/saved-posts.service';
import { SignService } from 'src/app/services/sign.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-saved-post',
  templateUrl: './saved-post.component.html',
  styleUrls: ['./saved-post.component.css']
})
export class SavedPostComponent implements OnInit {

constructor(private location:Location,private router:Router,private userService:SignService,private postService:PostService,private personaPageService:PersonalPageService){}

mainuser:User={} as User
user:User[]=[]
newPost:Post={} as Post
addLikeClicked:boolean[]=[]
currentDate=new Date()
personalPage:PersonalPage[]=[]
savedPosts:Post[]=[]
allSavedPosts:Post[]=[]
allposts:Post[]=[]
ngOnInit(): void {
  this.mainuser=history.state.mainuser
  this.personaPageService.getPersonalPage(this.mainuser.email).subscribe(personalPage=>{
    this.personalPage=personalPage
  })
  this.postService.getAllPosts().subscribe(allposts=>{
    this.allposts=allposts
    for(let i=0;i<this.allposts.length;i++){
      for(let j=0;j<this.allposts[i].userSaved.length;j++){
        if(this.allposts[i].userSaved[j].id==this.mainuser.id){
          this.savedPosts.push(this.allposts[i])
          this.allSavedPosts=this.savedPosts
          }
      }
    }

      for(let x=0;x<this.allSavedPosts.length;x++){
        for(let j=0;j<this.allSavedPosts[x].peopleAreLiked.length;j++){
          if(this.allSavedPosts[x].peopleAreLiked[j].id==this.mainuser.id){
              this.addLikeClicked[x]=true
            }
          }
        }
      
    })
  }
  
  disSavePost(index:number){
    
    for(let i=0;i<this.allSavedPosts[index].userSaved.length;i++){
      if(this.allSavedPosts[index].userSaved[i].id==this.mainuser.id){
        this.allSavedPosts[index].userSaved.splice(i,1)
      }
    }
    this.postService.updateThePost(this.allSavedPosts[index],this.allSavedPosts[index].id).subscribe(newPost=>{
    })
      this.allSavedPosts.splice(index,1)
  }

  showPost(index:number){
    this.router.navigateByUrl('showPost',{state:{post:this.allSavedPosts[index],mainuser:this.mainuser}})
  }
  
  showPersonalPage(index:number){
    this.userService.getUser(this.allSavedPosts[index].email).subscribe(user=>{
      this.user=user  
      this.router.navigateByUrl(`personalPage/${this.user[0].id}`,{state:{user:this.user[0],mainuser:this.mainuser}})
    })
  }

  sharePost(index:number){
    this.newPost.post=this.allSavedPosts[index].post
    this.newPost.email=this.mainuser.email
    this.newPost.username=this.mainuser.username
    this.newPost.date=this.currentDate
    this.newPost.typeOfPost='shared'
    this.newPost.numOfLikes=0
    this.newPost.peopleAreLiked=[]
    this.newPost.comments=[]
    this.newPost.userSaved=[]
    this.postService.addPost(this.newPost).subscribe(newPost=>{
      this.newPost=newPost
    })
  }

  showPeopleLikePost(index:number){
    this.router.navigateByUrl('peopleLikedPost',{state:{people:this.allSavedPosts[index].peopleAreLiked,mainuser:this.mainuser}})
  }

  addLike(indexOfPosts:number){
    this.addLikeClicked[indexOfPosts]=true
    this.allSavedPosts[indexOfPosts].peopleAreLiked.push(this.mainuser)
    this.allSavedPosts[indexOfPosts].numOfLikes=this.allSavedPosts[indexOfPosts].peopleAreLiked.length
    this.postService.updateThePost(this.allSavedPosts[indexOfPosts],this.allSavedPosts[indexOfPosts].id).subscribe(newpost=>{
      this.allSavedPosts[indexOfPosts]=newpost
    })
  }
  
  removeLike(indexOfPosts:number){
    this.addLikeClicked[indexOfPosts]=false
    for(let i=0;i<this.allSavedPosts[indexOfPosts].peopleAreLiked.length;i++){
      if(this.allSavedPosts[indexOfPosts].peopleAreLiked[i].id==this.mainuser.id){
        this.allSavedPosts[indexOfPosts].peopleAreLiked.splice(i,1)
      }
    }

    this.allSavedPosts[indexOfPosts].numOfLikes=this.allSavedPosts[indexOfPosts].peopleAreLiked.length
    this.postService.updateThePost(this.allSavedPosts[indexOfPosts],this.allSavedPosts[indexOfPosts].id).subscribe(newpost=>{
      this.allSavedPosts[indexOfPosts]=newpost
    })
  }
}
