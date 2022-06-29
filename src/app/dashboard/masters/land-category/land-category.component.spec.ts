import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandCategoryComponent } from './land-category.component';

describe('LandCategoryComponent', () => {
  let component: LandCategoryComponent;
  let fixture: ComponentFixture<LandCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
