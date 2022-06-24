import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageMasterListComponent } from './village-master-list.component';

describe('VillageMasterListComponent', () => {
  let component: VillageMasterListComponent;
  let fixture: ComponentFixture<VillageMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VillageMasterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
