import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayNumberComponent } from './birthday-number.component';

describe('BirthdayNumberComponent', () => {
    let component: BirthdayNumberComponent;
    let fixture: ComponentFixture<BirthdayNumberComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BirthdayNumberComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(BirthdayNumberComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
