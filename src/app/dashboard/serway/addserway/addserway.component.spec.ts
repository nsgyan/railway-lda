import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddserwayComponent } from './addserway.component';

describe('AddserwayComponent', () => {
  let component: AddserwayComponent;
  let fixture: ComponentFixture<AddserwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddserwayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddserwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
