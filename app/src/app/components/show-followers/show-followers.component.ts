import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user';

@Component({
  selector: 'app-show-followers',
  templateUrl: './show-followers.component.html',
  styleUrls: ['./show-followers.component.css']
})
export class ShowFollowersComponent implements OnInit {
  followers:User[]=[]
  mainuser:User={} as User
  constructor(private router:Router){}
  ngOnInit(): void {
    this.followers=history.state.followers
    this.mainuser=history.state.mainuser
  }

  showPersonalPage(index:number){
    this.router.navigateByUrl(`personalPage/${this.followers[index].id}`,{state:{user:this.followers[index],mainuser:this.mainuser}})

  }
}
