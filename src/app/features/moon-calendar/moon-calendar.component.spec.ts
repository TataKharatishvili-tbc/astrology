import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonCalendarComponent } from './moon-calendar.component';

describe('MoonCalendarComponent', () => {
  let component: MoonCalendarComponent;
  let fixture: ComponentFixture<MoonCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoonCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoonCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
