import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-edit-reply',
  templateUrl: './edit-reply.component.html',
  styleUrls: ['./edit-reply.component.css']
})
export class EditReplyComponent implements OnInit {
  comment:Comment={} as Comment
  reply:any
  constructor(private commentService:CommentService,private location:Location){}
  ngOnInit(): void {
    this.comment=history.state.coment
    this.reply=history.state.reply
  }

  editReply(){
    this.commentService.updateComment(this.comment,this.comment.id).subscribe(newComment=>{
      this.comment=newComment
    })
    this.location.back()
  }

}
