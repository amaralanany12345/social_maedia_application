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
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  user:User[]=[]
  newPost:Post={} as Post
  mainuser:User={} as User
  PersonalPage:PersonalPage[]=[] 
  allPersonalPage:PersonalPage[]=[]
  currentDate=new Date()
  allPosts:Post[]=[]
  allPages:PersonalPage[]=[]
  personalPageUserName:any
  all:PersonalPage[]=[]
  unique:PersonalPage[]=[]
  notAll:string[]=[]
  addLikeClicked:boolean[]=[]
  pagesUserName:string[]=[]; 
  theUser:User[]=[]
  allThePages:PersonalPage[]=[]
  allSavedPost:boolean[]=[]
  constructor(private postService:PostService,private router:Router,private thePersonalPage:PersonalPageService, private signService:SignService){}

  ngOnInit() {
    this.mainuser=history.state.user
    this.thePersonalPage.getPersonalPage(this.mainuser.email).subscribe(allpersonalpage=>{
      this.PersonalPage=allpersonalpage
    })

    this.thePersonalPage.getAllPages().subscribe(all=>{
      this.allThePages=all
      for(let i=0;i<this.allThePages.length;i++){
        for(let j=0;j<this.allThePages[i].followers.length;j++){
          if(this.allThePages[i].followers[j].id==this.mainuser.id)
          console.log(this.allThePages[i])
        }
      }
    })

    this.postService.getAllPosts().subscribe(allPosts=>{
      this.allPosts=allPosts
      
      for(let i=0;i<this.allPosts.length;i++){
        for(let j=0;j<this.allPosts[i].userSaved.length;j++){
            if(this.allPosts[i].userSaved[j].id==this.mainuser.id){
              this.allSavedPost[i]=true
          }
        }

        for(let j=0;j<this.allPosts[i].peopleAreLiked.length;j++){
          if(this.allPosts[i].peopleAreLiked[j].id==this.mainuser.id ){
          this.addLikeClicked[i]=true
          }
        }
      }
    })

    this.thePersonalPage.getAllPersonalPAge(this.mainuser.email).subscribe(allPages=>{
      this.allPages=allPages
      for(let i=0;i<this.allPages.length;i++){
        this.pagesUserName.push(allPages[i].username)
      }
    })
  }

  addLike(indexOfPosts:number){
    this.allPosts[indexOfPosts].peopleAreLiked.push(this.mainuser)
    this.addLikeClicked[indexOfPosts]=true
    this.allPosts[indexOfPosts].numOfLikes=this.allPosts[indexOfPosts].peopleAreLiked.length
    this.postService.updateThePost(this.allPosts[indexOfPosts],this.allPosts[indexOfPosts].id).subscribe(newpost=>{
      this.allPosts[indexOfPosts]=newpost
    })
  }
  
  removeLike(indexOfPosts:number){
    this.addLikeClicked[indexOfPosts]=false
    for(let i=0;i<this.allPosts[indexOfPosts].peopleAreLiked.length;i++){
      if(this.allPosts[indexOfPosts].peopleAreLiked[i].id==this.mainuser.id){
        this.allPosts[indexOfPosts].peopleAreLiked.splice(i,1)
      }
    }
    this.allPosts[indexOfPosts].numOfLikes=this.allPosts[indexOfPosts].peopleAreLiked.length
    this.postService.updateThePost(this.allPosts[indexOfPosts],this.allPosts[indexOfPosts].id).subscribe(newpost=>{
      this.allPosts[indexOfPosts]=newpost
    })
    
  }

  showPeopleLiked(index:number){
    this.router.navigateByUrl('peopleLikedPost',{state:{people:this.allPosts[index].peopleAreLiked,mainuser:this.mainuser}})
  }
  
  showPost(indexOfPosts:number){
    this.router.navigateByUrl('showPost',{state:{post:this.allPosts[indexOfPosts],user:this.mainuser,mainuser:this.mainuser}})
  }

  sharePost(index:number){
    this.newPost.post=this.allPosts[index].post
    this.newPost.email=this.mainuser.email
    this.newPost.username=this.mainuser.username
    this.newPost.date=this.currentDate
    this.newPost.typeOfPost='shared'
    this.newPost.numOfLikes=0
    this.newPost.peopleAreLiked=[]
    this.newPost.comments=[]
    this.newPost.userSaved=[]
    this.postService.addPost(this.newPost).subscribe(newPost=>{
    })
  }

  savePost(index:number){
  this.allSavedPost[index]=true
   this.allPosts[index].userSaved.push(this.mainuser)
   this.postService.updateThePost(this.allPosts[index],this.allPosts[index].id).subscribe(newPost=>{
    this.allPosts[index]=newPost
   })
  
  }

  disSavePost(index:number){
   this.allSavedPost[index]=false
   for(let i=0;i<this.allPosts[index].userSaved.length;i++){
    if(this.allPosts[index].userSaved[i].id==this.mainuser.id){
      this.allPosts[index].userSaved.splice(i,1)
    }
   }
   this.postService.updateThePost(this.allPosts[index],this.allPosts[index].id).subscribe(newPost=>{
    this.allPosts[index]=newPost
   })
  }

  showPersonalPage(index:number){
    this.signService.getUser(this.allPosts[index].email).subscribe(user=>{
      this.user=user
      this.router.navigateByUrl(`personalPage/${this.user[0].id}`,{state:{user:this.user[0],mainuser:this.mainuser}})
    })
  }  

  gotoCreatePostPAge(){
    this.router.navigateByUrl('createPost',{state:{user:this.mainuser}})
  }
 
 
  gotoPersonalPage(){
    this.router.navigateByUrl(`personalPage/${this.mainuser.id}`,{state:{user:this.mainuser,mainuser:this.mainuser}})
  }

  goPersonalPAge(index:number){
    this.router.navigateByUrl(`personalPage/${this.unique[index].id}`,{state:{user:this.unique[index],mainuser:this.mainuser}})
  }

  handleSearchnput(event:any,personalPageUserName:string){
    for(let i=0;i<this.allPages.length;i++){
      if(this.allPages[i].username.includes(personalPageUserName))
      {
        if(personalPageUserName==''){
          this.all=[]
        }
        else{
          this.all.push(this.allPages[i])
        }
      }
    }
    
    let arr=[]
    for(let i=0;i<this.all.length;i++){
      if(!this.all[i].username.includes(personalPageUserName)){
      }
      else{
        arr.push(this.all[i])
      }
    }

    let unique=[]

    for (let i = 0; i < arr.length; i++) { 
      if (unique.indexOf(arr[i]) === -1) { 
        unique.push(arr[i]); 
      } 
    } 
    this.unique=unique
  }

}
