import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOperationComponent } from './task-operation.component';

describe('TaskOperationComponent', () => {
  let component: TaskOperationComponent;
  let fixture: ComponentFixture<TaskOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
