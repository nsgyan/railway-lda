import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistricMasterEditComponent } from './distric-master-edit.component';

describe('DistricMasterEditComponent', () => {
  let component: DistricMasterEditComponent;
  let fixture: ComponentFixture<DistricMasterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistricMasterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistricMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
