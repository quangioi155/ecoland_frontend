import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZecListComponent } from './zec-list.component';

describe('ZecListComponent', () => {
  let component: ZecListComponent;
  let fixture: ComponentFixture<ZecListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZecListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZecListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
