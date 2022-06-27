import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateMasterEditComponent } from './state-master-edit.component';

describe('StateMasterEditComponent', () => {
  let component: StateMasterEditComponent;
  let fixture: ComponentFixture<StateMasterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateMasterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
