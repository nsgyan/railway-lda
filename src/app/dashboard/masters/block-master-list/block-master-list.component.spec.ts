import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockMasterListComponent } from './block-master-list.component';

describe('BlockMasterListComponent', () => {
  let component: BlockMasterListComponent;
  let fixture: ComponentFixture<BlockMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockMasterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
