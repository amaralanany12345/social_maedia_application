import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/app/comment';
import { PeopleRepliedToComment } from 'src/app/people-replied-to-comment';
import { Post } from 'src/app/post';
import { CommentService } from 'src/app/services/comment.service';
import { User } from 'src/app/user';
import { Location } from '@angular/common'

@Component({
  selector: 'app-reply-to-comment',
  templateUrl: './reply-to-comment.component.html',
  styleUrls: ['./reply-to-comment.component.css']
})
export class ReplyToCommentComponent implements OnInit {
  Reply:PeopleRepliedToComment={} as PeopleRepliedToComment
  comment:Comment={} as Comment
  user:User={} as User
  mainuser:User={} as User
  post:Post={} as Post
  constructor(private commentService:CommentService,private router:Router,private location:Location){}
  ngOnInit(): void {
    this.comment=history.state.comment
    this.user=history.state.user
    this.post=history.state.post
    this.mainuser=history.state.mainuser
  }
  reply(){
    this.Reply.userLikedReply=[]
    this.Reply.numOfReplyLike=0
    this.Reply.user=this.mainuser
    this.comment.replies.push(this.Reply)
    this.commentService.updateComment(this.comment,this.comment.id).subscribe(newComment=>{
      this.comment=newComment
    })
    this.location.back()
  }

}
