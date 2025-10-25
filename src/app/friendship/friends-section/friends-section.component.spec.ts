import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsSectionComponent } from './friends-section.component';

describe('FriendsSectionComponent', () => {
  let component: FriendsSectionComponent;
  let fixture: ComponentFixture<FriendsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendsSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
