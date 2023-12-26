import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user';

@Component({
  selector: 'app-show-following',
  templateUrl: './show-following.component.html',
  styleUrls: ['./show-following.component.css']
})
export class ShowFollowingComponent implements OnInit {
  following:User[]=[]
  mainuser:User={} as User
  constructor(private router:Router){}
  ngOnInit(): void {
    this.following=history.state.following
    this.mainuser=history.state.mainuser
  }

  showPersonalPage(index:number){
    this.router.navigateByUrl(`personalPage/${this.following[index].id}`,{state:{user:this.following[index],mainuser:this.mainuser}})
  }

}
