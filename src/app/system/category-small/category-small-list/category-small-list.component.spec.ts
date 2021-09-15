import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySmallListComponent } from './category-small-list.component';

describe('CategorySmallListComponent', () => {
  let component: CategorySmallListComponent;
  let fixture: ComponentFixture<CategorySmallListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySmallListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySmallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
