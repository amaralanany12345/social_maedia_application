import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/post';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  post:Post={} as Post
  ngOnInit(): void {
    this.post=history.state.post
    console.log(this.post)
  }

}
