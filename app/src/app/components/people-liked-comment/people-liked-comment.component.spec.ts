import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleLikedCommentComponent } from './people-liked-comment.component';

describe('PeopleLikedCommentComponent', () => {
  let component: PeopleLikedCommentComponent;
  let fixture: ComponentFixture<PeopleLikedCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleLikedCommentComponent]
    });
    fixture = TestBed.createComponent(PeopleLikedCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
