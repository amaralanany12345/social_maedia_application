import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user';

@Component({
  selector: 'app-people-liked-reply',
  templateUrl: './people-liked-reply.component.html',
  styleUrls: ['./people-liked-reply.component.css']
})
export class PeopleLikedReplyComponent implements OnInit {
  peopleLikedReply:User[]=[]
  mainuser:User={} as User
  constructor(private router:Router){}
  ngOnInit(): void {
    this.peopleLikedReply=history.state.poepleLikedReply
    this.mainuser=history.state.mainuser
  }
  showPersonalPage(index:number){
    this.router.navigateByUrl(`personalPage/${this.peopleLikedReply[index]}`,{state:{user:this.peopleLikedReply[index],mainuser:this.mainuser}})
  }
}
