import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user';

@Component({
  selector: 'app-people-liked-comment',
  templateUrl: './people-liked-comment.component.html',
  styleUrls: ['./people-liked-comment.component.css']
})
export class PeopleLikedCommentComponent implements OnInit {
  peopleLikedComment:User[]=[]
  mainuser:User={} as User
  constructor(private router:Router){}
  ngOnInit(): void {
    this.mainuser=history.state.mainuser
    this.peopleLikedComment=history.state.people
  }

goToPersonalPage(index:number){
  this.router.navigateByUrl(`personalPage/${this.peopleLikedComment[index].id}`,{state:{user:this.peopleLikedComment[index],mainuser:this.mainuser}})
}
}
