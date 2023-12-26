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
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.css']
})
export class PersonalPageComponent implements OnInit {
  user:User={} as User
  allUserPosts:Post[]=[]
  newPost:Post={} as Post
  currentDate=new Date()
  addLikeClicked:boolean[]=[]
  mainuser:User={} as User
  personalPage:PersonalPage[]=[]
  mainuserPersonalPage:PersonalPage[]=[]
  theUser:User[]=[]
  Joining:boolean=false
  allThePages:PersonalPage[]=[]
  allSavedPost:boolean[]=[]
  savedPosts:Post[]=[]
  constructor(private personalPAgeService:PersonalPageService,private postSerivce:PostService,private signService:SignService,private router:Router,private postService:PostService){}

  ngOnInit(): void {
    this.user=history.state.user
    this.mainuser=history.state.mainuser
    this.personalPAgeService.getPersonalPage(this.mainuser.email).subscribe(personalpage=>{
      this.mainuserPersonalPage=personalpage
    })  

    this.postSerivce.getSavedPost(this.mainuser).subscribe(posts=>{
      for(let i=0;i<posts.length;i++){
        for(let j=0;j<posts[i].userSaved.length;j++){
          if(posts[i].userSaved[j].id==this.mainuser.id){
            this.savedPosts.push(posts[i])
          }
        }
      }
    })

    this.personalPAgeService.getPersonalPost(this.user.email).subscribe(allPosts=>{
    this.allUserPosts=allPosts
    for(let i=0;i<this.allUserPosts.length;i++){
        
      for(let j=0;j<this.allUserPosts[i].userSaved.length;j++){
        if(this.allUserPosts[i].userSaved[j].id==this.mainuser.id){
          this.allSavedPost[i]=true
        }
      }

      for(let j=0;j<this.allUserPosts[i].peopleAreLiked.length;j++){
          if(this.allUserPosts[i].peopleAreLiked[j].id==this.mainuser.id ){
          this.addLikeClicked[i]=true
          }
        }
      }
    })
    
    this.personalPAgeService.getPersonalPage(this.user.email).subscribe(personalpage=>{
      this.personalPage=personalpage
      
      for(let i=0;i<this.personalPage[0].followers.length;i++){
          if(this.personalPage[0].followers[i].id==this.mainuser.id){
            this.Joining=true
          }
      }
    })

    this.signService.getUser(this.user.email).subscribe(user=>{
      this.theUser=user
    })

  }

  profileImage(){
    this.router.navigateByUrl('postImage',{state:{mainuser:this.mainuser}})
  }

  join(){
    this.Joining=true
    this.personalPage[0].followers.push(this.mainuser)
    this.personalPage[0].numOfFollowers=this.personalPage[0].followers.length
    this.personalPAgeService.updatePersonalPage(this.personalPage[0],this.personalPage[0].id).subscribe(newPersonalPage=>{
      this.personalPage[0]=newPersonalPage
    })
  }

  disJoin(){
    this.Joining=false
    for(let i=0;i<this.personalPage[0].followers.length;i++){
      if(this.personalPage[0].followers[i].id=this.mainuser.id){
        this.personalPage[0].followers.splice(i,1)
      }
    }

    this.personalPage[0].numOfFollowers=this.personalPage[0].followers.length
    this.personalPAgeService.updatePersonalPage(this.personalPage[0],this.personalPage[0].id).subscribe(newPersonalPage=>{
      this.personalPage[0]=newPersonalPage
    })
  }

  gotosavedPosts(){
    this.router.navigateByUrl('savedPost',{state:{savedPosts:this.savedPosts,mainuser:this.mainuser}})
  }

  showFollowers(index:number){
    this.router.navigateByUrl('showFollowers',{state:{followers:this.personalPage[0].followers,mainuser:this.mainuser}})
  }
  
  showPost(indexOfPosts:number){
    this.router.navigateByUrl('showPost',{state:{post:this.allUserPosts[indexOfPosts],user:this.user,mainuser:this.mainuser}})
  }

  sharePost(index:number){
    this.newPost.post=this.allUserPosts[index].post
    this.newPost.email=this.user.email
    this.newPost.username=this.user.username
    this.newPost.date=this.currentDate
    this.newPost.typeOfPost='shared'
    this.newPost.numOfLikes=0
    this.newPost.peopleAreLiked=[]
    this.newPost.comments=[]
    this.newPost.userSaved=[]
    this.postService.addPost(this.newPost).subscribe(newPost=>{
    })
  }

  addLike(indexOfPosts:number){
    this.allUserPosts[indexOfPosts].peopleAreLiked.push(this.mainuser)
    this.allUserPosts[indexOfPosts].numOfLikes=this.allUserPosts[indexOfPosts].peopleAreLiked.length
    this.addLikeClicked[indexOfPosts]=true
    this.postService.updateThePost(this.allUserPosts[indexOfPosts],this.allUserPosts[indexOfPosts].id).subscribe(newpost=>{
      this.allUserPosts[indexOfPosts]=newpost
    })
  }
  
  removeLike(indexOfPosts:number){
    this.addLikeClicked[indexOfPosts]=false
    for(let i=0;i<this.allUserPosts[indexOfPosts].peopleAreLiked.length;i++){
      if(this.allUserPosts[indexOfPosts].peopleAreLiked[i].id==this.mainuser.id){
        this.allUserPosts[indexOfPosts].peopleAreLiked.splice(i,1)
      }
    }

    this.allUserPosts[indexOfPosts].numOfLikes=this.allUserPosts[indexOfPosts].peopleAreLiked.length
    this.postService.updateThePost(this.allUserPosts[indexOfPosts],this.allUserPosts[indexOfPosts].id).subscribe(newpost=>{
      this.allUserPosts[indexOfPosts]=newpost
    })
  }

  savePost(index:number){
    this.allSavedPost[index]=true
    this.allUserPosts[index].userSaved.push(this.mainuser)
    this.postSerivce.updateThePost(this.allUserPosts[index],this.allUserPosts[index].id).subscribe(newPost=>{
      this.allUserPosts[index]=newPost
    })
  }
  disSavePost(index:number){
    this.allSavedPost[index]=false
    for(let i=0;i<this.allUserPosts[index].userSaved.length;i++){
      if(this.allUserPosts[index].userSaved[i].id==this.mainuser.id){
        this.allUserPosts[index].userSaved.splice(i,1)
      }
    }
    this.postSerivce.updateThePost(this.allUserPosts[index],this.allUserPosts[index].id).subscribe(newPost=>{
      this.allUserPosts[index]=newPost
    })
  }

  showPeopleLikePost(index:number){
    this.router.navigateByUrl('peopleLikedPost',{state:{people:this.allUserPosts[index].peopleAreLiked,mainuser:this.mainuser}})
  }

  edit(index:number){
    this.router.navigateByUrl('editPost',{state:{post:this.allUserPosts[index]}})
  }

  deletePost(index:number){
    this.postService.deletePost(this.allUserPosts[index].id).subscribe(deletedPost=>{

    })
      this.allUserPosts.splice(index,1)
  }

  gotoCreatePostPAge(){
    this.router.navigateByUrl('createPost',{state:{user:this.mainuser}})
  }
}
