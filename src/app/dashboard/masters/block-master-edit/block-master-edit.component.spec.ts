import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockMasterEditComponent } from './block-master-edit.component';

describe('BlockMasterEditComponent', () => {
  let component: BlockMasterEditComponent;
  let fixture: ComponentFixture<BlockMasterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockMasterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
