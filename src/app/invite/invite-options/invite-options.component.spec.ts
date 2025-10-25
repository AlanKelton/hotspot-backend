import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteOptionsComponent } from './invite-options.component';

describe('InviteOptionsComponent', () => {
  let component: InviteOptionsComponent;
  let fixture: ComponentFixture<InviteOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InviteOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
