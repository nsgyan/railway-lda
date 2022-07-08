import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerwayListComponent } from './serway-list.component';

describe('SerwayListComponent', () => {
  let component: SerwayListComponent;
  let fixture: ComponentFixture<SerwayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerwayListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerwayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
