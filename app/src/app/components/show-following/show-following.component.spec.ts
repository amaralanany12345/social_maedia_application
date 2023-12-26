import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFollowingComponent } from './show-following.component';

describe('ShowFollowingComponent', () => {
  let component: ShowFollowingComponent;
  let fixture: ComponentFixture<ShowFollowingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowFollowingComponent]
    });
    fixture = TestBed.createComponent(ShowFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
