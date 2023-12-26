import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PersonalPageComponent } from './components/personal-page/personal-page.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
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

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    MainPageComponent,
    PersonalPageComponent,
    CreatePostComponent,
    AddCommentComponent,
    ShowPostComponent,
    PeopleLikedPostComponent,
    ReplyToCommentComponent,
    PeopleLikedCommentComponent,
    PeopleLikedReplyComponent,
    EditPostComponent,
    ShowFollowersComponent,
    ShowFollowingComponent,
    EditCommentComponent,
    EditReplyComponent,
    SavedPostComponent,
    PostImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
