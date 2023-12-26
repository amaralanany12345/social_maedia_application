import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyToCommentComponent } from './reply-to-comment.component';

describe('ReplyToCommentComponent', () => {
  let component: ReplyToCommentComponent;
  let fixture: ComponentFixture<ReplyToCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplyToCommentComponent]
    });
    fixture = TestBed.createComponent(ReplyToCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
