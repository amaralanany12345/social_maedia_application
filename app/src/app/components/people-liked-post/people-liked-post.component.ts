import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalPage } from 'src/app/personal-page';
import { PersonalPageService } from 'src/app/services/personal-page.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-people-liked-post',
  templateUrl: './people-liked-post.component.html',
  styleUrls: ['./people-liked-post.component.css']
})
export class PeopleLikedPostComponent implements OnInit {
  peopleAreLiked:User[]=[]
  mainuser:User={} as User
  constructor(private router:Router,private personalPage:PersonalPageService){}
  ngOnInit(): void {
    this.peopleAreLiked=history.state.people
    this.mainuser=history.state.mainuser
  }

  showPersonalPage(index:number){
    this.router.navigateByUrl(`personalPage/${this.peopleAreLiked[index].id}`,{state:{user:this.peopleAreLiked[index],mainuser:this.mainuser}})
  } 
}
