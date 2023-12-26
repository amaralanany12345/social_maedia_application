import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  comment:Comment={} as Comment
  constructor(private location:Location,private commentService:CommentService){}
  ngOnInit(): void {
    this.comment=history.state.comment
  }
  editComment(){
    this.commentService.updateComment(this.comment,this.comment.id).subscribe(newComment=>{
      this.comment=newComment
    })
    this.location.back()
  }
}
