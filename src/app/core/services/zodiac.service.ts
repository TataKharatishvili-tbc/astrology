import { Injectable } from '@angular/core';
import { ZodiacSign } from '../models/astrology.models';
import zodiacData from '../../../assets/data/zodiac-signs.json';

@Injectable({
    providedIn: 'root'
})
export class ZodiacService {

    private zodiacSigns: ZodiacSign[] = zodiacData as ZodiacSign[];

    constructor() { }

    getAllSigns(): ZodiacSign[] {
        return this.zodiacSigns;
    }

    getSignById(id: string): ZodiacSign | undefined {
        return this.zodiacSigns.find(sign => sign.id === id);
    }

    getSignByDate(month: number, day: number): ZodiacSign | undefined {
        return this.zodiacSigns.find(sign => {
            const start = sign.dates.start;
            const end = sign.dates.end;

            // ვამოწმებთ არის თუ არა თარიღი დიაპაზონში
            if (start.month === end.month) {
                return month === start.month && day >= start.day && day <= end.day;
            } else {
                return (
                    (month === start.month && day >= start.day) ||
                    (month === end.month && day <= end.day)
                );
            }
        });
    }

    getSignsByElement(element: string): ZodiacSign[] {
        return this.zodiacSigns.filter(sign => sign.element === element);
    }

    getCompatibility(sign1Id: string, sign2Id: string): 'best' | 'good' | 'challenging' | 'neutral' {
        const sign = this.getSignById(sign1Id);
        if (!sign) return 'neutral';

        if (sign.compatibility.best.includes(sign2Id)) return 'best';
        if (sign.compatibility.good.includes(sign2Id)) return 'good';
        if (sign.compatibility.challenging.includes(sign2Id)) return 'challenging';

        return 'neutral';
    }
}
