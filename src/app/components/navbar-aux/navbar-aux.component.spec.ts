import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAuxComponent } from './navbar-aux.component';

describe('NavbarAuxComponent', () => {
  let component: NavbarAuxComponent;
  let fixture: ComponentFixture<NavbarAuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarAuxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarAuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
