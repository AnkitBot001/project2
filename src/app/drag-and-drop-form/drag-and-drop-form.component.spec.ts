import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropFormComponent } from './drag-and-drop-form.component';

describe('DragAndDropFormComponent', () => {
  let component: DragAndDropFormComponent;
  let fixture: ComponentFixture<DragAndDropFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DragAndDropFormComponent]
    });
    fixture = TestBed.createComponent(DragAndDropFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
