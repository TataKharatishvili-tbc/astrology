import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZodiacDetailComponent } from './zodiac-detail.component';

describe('ZodiacDetailComponent', () => {
  let component: ZodiacDetailComponent;
  let fixture: ComponentFixture<ZodiacDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZodiacDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZodiacDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
