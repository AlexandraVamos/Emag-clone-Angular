import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAuxListComponent } from './navbar-aux-list.component';

describe('NavbarAuxListComponent', () => {
  let component: NavbarAuxListComponent;
  let fixture: ComponentFixture<NavbarAuxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarAuxListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarAuxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
