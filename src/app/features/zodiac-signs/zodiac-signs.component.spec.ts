import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZodiacSignsComponent } from './zodiac-signs.component';

describe('ZodiacSignsComponent', () => {
  let component: ZodiacSignsComponent;
  let fixture: ComponentFixture<ZodiacSignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZodiacSignsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZodiacSignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
