import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleLikedPostComponent } from './people-liked-post.component';

describe('PeopleLikedPostComponent', () => {
  let component: PeopleLikedPostComponent;
  let fixture: ComponentFixture<PeopleLikedPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleLikedPostComponent]
    });
    fixture = TestBed.createComponent(PeopleLikedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
