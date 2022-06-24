import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistictMasterComponent } from './distict-master.component';

describe('DistictMasterComponent', () => {
  let component: DistictMasterComponent;
  let fixture: ComponentFixture<DistictMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistictMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistictMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
