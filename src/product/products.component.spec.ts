import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { productsComponent } from './products.component';

describe('productsComponent', () => {
  let component: productsComponent;
  let fixture: ComponentFixture<productsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ productsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(productsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
