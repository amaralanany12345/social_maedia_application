import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/app/comment';
import { PeopleComment } from 'src/app/people-comment';
import { PeopleRepliedToComment } from 'src/app/people-replied-to-comment';
import { PersonalPage } from 'src/app/personal-page';
import { Post } from 'src/app/post';
import { CommentService } from 'src/app/services/comment.service';
import { PersonalPageService } from 'src/app/services/personal-page.service';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit{
  post:Post={} as Post
  user:User={} as User
  mainuser:User={} as User
  peopleComment:PeopleComment={} as PeopleComment
  newComment:Comment={} as Comment
  currentDate=new Date()
  allComments:Comment[]=[]
  personalpage:PersonalPage[]=[]
  peopleAddLikComment:boolean[]=[]
  peopleAddLikeToReply:boolean[][]=[[],[]]
  reply:boolean=false
  constructor(private router:Router,private postService:PostService,private commentService:CommentService,private personalPage:PersonalPageService){}

  ngOnInit(): void {
    this.post=history.state.post
    this.user=history.state.user
    this.mainuser=history.state.mainuser
    this.commentService.getPostComment(this.post.post,this.post.email).subscribe(allComment=>{
      this.allComments=allComment
      for(let i=0;i<this.allComments.length;i++){
        for(let j=0;j<this.allComments[i].peopleAreLiked.length;j++){
          if(this.allComments[i].peopleAreLiked[j].id==this.mainuser.id){
            this.peopleAddLikComment[i]=true
          }
        }

        for(let x=0;x<this.allComments[i].replies.length;x++){
          for(let y=0;y<this.allComments[i].replies[x].userLikedReply.length;y++){
            if(this.allComments[i].replies[x].userLikedReply[y].id==this.mainuser.id){
              this.peopleAddLikeToReply[i][x]=true
            }
          }
        }
      }
    })
  }
  
  addComment(){
    this.newComment.email=this.mainuser.email
    this.newComment.username=this.mainuser.username
    this.newComment.date=this.currentDate
    this.newComment.postOwnerEmail=this.post.email
    this.newComment.numOfCommentLikes=0
    this.newComment.post=this.post.post
    this.newComment.peopleAreLiked=[]
    this.newComment.replies=[]
    this.newComment.id++
    this.commentService.addComment(this.newComment).subscribe(newComment=>{
      this.newComment=newComment
    })
    this.getPostComment()
  }

  editComment(index:number){
    this.router.navigateByUrl('editComment',{state:{comment:this.allComments[index],mainuser:this.mainuser}})
  }

  deleteComment(index:number){
    this.commentService.deleteComment(this.allComments[index].id).subscribe(newComments=>{
    })
    this.allComments.splice(index,1)
  }

  getPostComment(){
    this.commentService.getPostComment(this.post.post,this.post.email).subscribe(allComment=>{
      this.allComments=allComment
    })
  }

  showPeopleLikePost(){
    this.router.navigateByUrl('peopleLikedPost',{state:{people:this.post.peopleAreLiked,mainuser:this.mainuser}})
    
  }

  likeComment(index:number){
    this.allComments[index].peopleAreLiked.push(this.mainuser)
    this.peopleAddLikComment[index]=true
    this.allComments[index].numOfCommentLikes=this.allComments[index].peopleAreLiked.length
    this.commentService.updateComment(this.allComments[index],this.allComments[index].id).subscribe(newComment=>{
      this.allComments[index]=newComment
    })
  }

  disLikeComment(index:number){
    this.peopleAddLikComment[index]=false
    this.allComments[index].peopleAreLiked.splice(this.allComments[index].peopleAreLiked.indexOf(this.mainuser),1)
    this.allComments[index].numOfCommentLikes=this.allComments[index].peopleAreLiked.length
    this.commentService.updateComment(this.allComments[index],this.allComments[index].id).subscribe(newComment=>{
      this.allComments[index]=newComment
    })
  }

  showPeopleLikeComment(index:number){
    this.router.navigateByUrl('peopleLikedComment',{state:{people:this.allComments[index].peopleAreLiked,mainuser:this.mainuser}})
  }

  showPersonalPage(index:number){
    this.personalPage.getPersonalPage(this.allComments[index].email).subscribe(personalPage=>{
      this.personalpage=personalPage
      this.router.navigateByUrl(`personalPage/${this.personalpage[this.personalpage.length-1].id}`,{state:{user:this.personalpage[this.personalpage.length-1],mainuser:this.mainuser}})
    })
  } 
  
  gotoPersonalPage(){
    this.personalPage.getOnePersonalPage(this.post.email).subscribe(personalPage=>{
      this.router.navigateByUrl(`personalPage/${personalPage.id}`,{state:{user:this.post,mainuser:this.mainuser}})
    })
  }

  goToPersonalPage(i:number,j:number){
    this.router.navigateByUrl(`personalPage/${this.allComments[i].replies[j].id}`,{state:{user:this.allComments[i].replies[j].user,mainuser:this.mainuser}})
  }

  replyToComment(index:number){
    this.router.navigateByUrl('replyToComment',{state:{comment:this.allComments[index],user:this.user,post:this.post,mainuser:this.mainuser}})   
  }

  editReply(i:number,j:number){
    this.router.navigateByUrl('editReply',{state:{coment:this.allComments[i],reply:this.allComments[i].replies[j],mainuser:this.mainuser}})
  }
  deleteReply(i:number,j:number){
    this.allComments[i].replies.splice(j,1)
    this.commentService.updateComment(this.allComments[i],this.allComments[i].id).subscribe(newComment=>{
      this.allComments[i]=newComment
    })
  }

  likeReply(i:number,j:number){
    this.allComments[i].replies[j].userLikedReply.push(this.mainuser)
    this.peopleAddLikeToReply[i][j]=true
    this.allComments[i].replies[j].numOfReplyLike=this.allComments[i].replies[j].userLikedReply.length
    this.commentService.updateComment(this.allComments[i],this.allComments[i].id).subscribe(newcomment=>{
      this.allComments[i]=newcomment
    })
  }

  disLikeReply(i:number,j:number){
    this.peopleAddLikeToReply[i][j]=false
    this.allComments[i].replies[j].userLikedReply.splice(this.allComments[i].replies[j].userLikedReply.indexOf(this.mainuser),1)
    this.allComments[i].replies[j].numOfReplyLike=this.allComments[i].replies[j].userLikedReply.length
    this.commentService.updateComment(this.allComments[i],this.allComments[i].id).subscribe(newcomment=>{
      this.allComments[i]=newcomment
    })
  }

  showPeopleLikeReply(i:number,j:number){
    this.router.navigateByUrl('peopleLikedReply',{state:{poepleLikedReply:this.allComments[i].replies[j].userLikedReply,mainuser:this.mainuser}})
  }
}
