import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageMasterEditComponent } from './village-master-edit.component';

describe('VillageMasterEditComponent', () => {
  let component: VillageMasterEditComponent;
  let fixture: ComponentFixture<VillageMasterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VillageMasterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
