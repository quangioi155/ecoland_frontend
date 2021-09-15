import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySmallEditComponent } from './category-small-edit.component';

describe('CategorySmallEditComponent', () => {
  let component: CategorySmallEditComponent;
  let fixture: ComponentFixture<CategorySmallEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySmallEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySmallEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
