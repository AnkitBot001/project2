import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipartComponent } from './multipart.component';

describe('MultipartComponent', () => {
  let component: MultipartComponent;
  let fixture: ComponentFixture<MultipartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultipartComponent]
    });
    fixture = TestBed.createComponent(MultipartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
