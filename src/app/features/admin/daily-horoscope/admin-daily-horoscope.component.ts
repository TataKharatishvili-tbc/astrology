import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Admin Feature
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-admin-daily-horoscope',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './admin-daily-horoscope.component.html',
    styleUrl: './admin-daily-horoscope.component.scss'
})
export class AdminDailyHoroscopeComponent {
    horoscopeForm: FormGroup;
    zodiacSigns = [
        { value: 'aries', label: 'ვერძი' },
        { value: 'taurus', label: 'კურო' },
        { value: 'gemini', label: 'ტყუპები' },
        { value: 'cancer', label: 'კირჩხიბი' },
        { value: 'leo', label: 'ლომი' },
        { value: 'virgo', label: 'ქალწული' },
        { value: 'libra', label: 'სასწორი' },
        { value: 'scorpio', label: 'მორიელი' },
        { value: 'sagittarius', label: 'მშვილდოსანი' },
        { value: 'capricorn', label: 'თხის რქა' },
        { value: 'aquarius', label: 'მერწყული' },
        { value: 'pisces', label: 'თევზები' }
    ];

    constructor(private fb: FormBuilder) {
        const today = new Date().toISOString().split('T')[0];

        this.horoscopeForm = this.fb.group({
            date: [today, Validators.required],
            sign: ['', Validators.required],
            general: ['', Validators.required],
            love: ['', Validators.required],
            career: ['', Validators.required],
            health: ['', Validators.required],
            finance: ['', Validators.required],
            luckyNumber: ['', Validators.required],
            luckyColor: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.horoscopeForm.valid) {
            const formValue = this.horoscopeForm.value;
            const date = new Date(formValue.date);

            const result = {
                date: formValue.date,
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
                sign: formValue.sign,
                data: {
                    general: formValue.general,
                    love: formValue.love,
                    career: formValue.career,
                    health: formValue.health,
                    finance: formValue.finance,
                    luckyNumber: formValue.luckyNumber,
                    luckyColor: formValue.luckyColor
                }
            };

            console.group('Daily Horoscope Entry');
            console.log('Form Data:', result);
            console.log('JSON Structure Preview:', {
                [formValue.sign]: {
                    [date.getDate()]: result.data
                }
            });
            console.groupEnd();

            alert('მონაცემები წარმატებით გაიგზავნა კონსოლში!');
        } else {
            Object.keys(this.horoscopeForm.controls).forEach(key => {
                const control = this.horoscopeForm.get(key);
                if (control?.invalid) {
                    control.markAsTouched();
                }
            });
        }
    }
}
