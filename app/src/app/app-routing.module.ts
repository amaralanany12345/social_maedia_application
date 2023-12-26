import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PersonalPageComponent } from './components/personal-page/personal-page.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { ShowPostComponent } from './components/show-post/show-post.component';
import { PeopleLikedPostComponent } from './components/people-liked-post/people-liked-post.component';
import { ReplyToCommentComponent } from './components/reply-to-comment/reply-to-comment.component';
import { PeopleLikedCommentComponent } from './components/people-liked-comment/people-liked-comment.component';
import { PeopleLikedReplyComponent } from './components/people-liked-reply/people-liked-reply.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { ShowFollowersComponent } from './components/show-followers/show-followers.component';
import { ShowFollowingComponent } from './components/show-following/show-following.component';
import { EditCommentComponent } from './components/edit-comment/edit-comment.component';
import { EditReplyComponent } from './components/edit-reply/edit-reply.component';
import { SavedPostComponent } from './components/saved-post/saved-post.component';
import { PostImageComponent } from './components/post-image/post-image.component';

const routes: Routes = [
  {path:'',component:SigninComponent},
  {path:'S',component:SignupComponent},
  {path:'mainPage',component:MainPageComponent},
  {path:'personalPage/:pId',component:PersonalPageComponent},
  {path:'createPost',component:CreatePostComponent},
  {path:'postImage',component:PostImageComponent},
  {path:'showPost',component:ShowPostComponent},
  {path:'peopleLikedPost',component:PeopleLikedPostComponent},
  {path:'replyToComment',component:ReplyToCommentComponent},
  {path:'peopleLikedComment',component:PeopleLikedCommentComponent},
  {path:'peopleLikedReply',component:PeopleLikedReplyComponent},
  {path:'editPost',component:EditPostComponent},
  {path:'showFollowers',component:ShowFollowersComponent},
  {path:'showFollowing',component:ShowFollowingComponent},
  {path:'editComment',component:EditCommentComponent},
  {path:'editReply',component:EditReplyComponent},
  {path:'savedPost',component:SavedPostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
