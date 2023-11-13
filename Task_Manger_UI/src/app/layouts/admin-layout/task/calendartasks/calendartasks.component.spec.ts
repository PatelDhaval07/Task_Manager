import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendartasksComponent } from './calendartasks.component';

describe('CalendartasksComponent', () => {
  let component: CalendartasksComponent;
  let fixture: ComponentFixture<CalendartasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendartasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendartasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
