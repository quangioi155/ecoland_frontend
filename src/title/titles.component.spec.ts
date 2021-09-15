import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { titlesComponent } from './titles.component';

describe('titlesComponent', () => {
  let component: titlesComponent;
  let fixture: ComponentFixture<titlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ titlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(titlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
