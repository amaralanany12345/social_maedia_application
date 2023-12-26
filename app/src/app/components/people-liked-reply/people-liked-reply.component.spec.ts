import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleLikedReplyComponent } from './people-liked-reply.component';

describe('PeopleLikedReplyComponent', () => {
  let component: PeopleLikedReplyComponent;
  let fixture: ComponentFixture<PeopleLikedReplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleLikedReplyComponent]
    });
    fixture = TestBed.createComponent(PeopleLikedReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
