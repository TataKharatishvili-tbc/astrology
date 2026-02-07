import { Injectable } from '@angular/core';

export interface DailyHoroscope {
    general: string;
    love: string;
    career: string;
    health: string;
    finance: string;
    luckyNumber: number;
    luckyColor: string;
}

export interface MonthlyHoroscopeData {
    year: number;
    month: number;
    horoscopes: {
        [signId: string]: {
            [day: string]: DailyHoroscope;
        };
    };
}

@Injectable({
    providedIn: 'root'
})
export class HoroscopeService {
    private currentMonthData: MonthlyHoroscopeData | null = null;
    private loadingPromise: Promise<void> | null = null;

    constructor() {
        this.loadingPromise = this.loadCurrentMonth();
    }

    /**
     * ტვირთავს მიმდინარე თვის მონაცემებს
     */
    private async loadCurrentMonth(): Promise<void> {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // JavaScript თვეები იწყება 0-დან

        try {
            // დინამიურად ვტვირთავთ მიმდინარე თვის ფაილს
            const fileName = `daily-horoscopes-${year}-${month.toString().padStart(2, '0')}.json`;
            console.log('Loading horoscope file:', fileName);
            const data = await import(`../../../assets/data/${fileName}`);
            this.currentMonthData = data.default || data;
            console.log('Horoscope data loaded:', this.currentMonthData);
        } catch (error) {
            console.error('ვერ მოიძებნა დღიური ჰოროსკოპების ფაილი:', error);
            this.currentMonthData = null;
        }
    }

    /**
     * აბრუნებს კონკრეტული დღის ჰოროსკოპს
     */
    async getDailyHoroscope(signId: string, date: Date = new Date()): Promise<DailyHoroscope | null> {
        // ველოდებით მონაცემების ჩატვირთვას
        if (this.loadingPromise) {
            await this.loadingPromise;
        }

        if (!this.currentMonthData) {
            return null;
        }

        const day = date.getDate();
        console.log('Getting horoscope for:', signId, 'day:', day);
        const signData = this.currentMonthData.horoscopes[signId];

        if (!signData || !signData[day]) {
            console.log('No data found for:', signId, day, 'Available days:', Object.keys(signData || {}));
            return null;
        }

        return signData[day];
    }

    /**
     * აბრუნებს დღევანდელ ჰოროსკოპს
     */
    async getTodayHoroscope(signId: string): Promise<DailyHoroscope | null> {
        return this.getDailyHoroscope(signId);
    }

    /**
     * აბრუნებს მთელი თვის ჰოროსკოპებს კონკრეტული ნიშნისთვის
     */
    async getMonthlyHoroscopes(signId: string): Promise<{ [day: string]: DailyHoroscope } | null> {
        if (this.loadingPromise) {
            await this.loadingPromise;
        }

        if (!this.currentMonthData) {
            return null;
        }

        return this.currentMonthData.horoscopes[signId] || null;
    }

    /**
     * აბრუნებს მიმდინარე თვის ინფორმაციას
     */
    async getCurrentMonthInfo(): Promise<{ year: number; month: number } | null> {
        if (this.loadingPromise) {
            await this.loadingPromise;
        }

        if (!this.currentMonthData) {
            return null;
        }

        return {
            year: this.currentMonthData.year,
            month: this.currentMonthData.month
        };
    }

    /**
     * ამოწმებს არის თუ არა კონკრეტული დღის მონაცემები ხელმისაწვდომი
     */
    async isDateAvailable(signId: string, date: Date): Promise<boolean> {
        const horoscope = await this.getDailyHoroscope(signId, date);
        return horoscope !== null;
    }

    /**
     * აბრუნებს თვის ყველა ხელმისაწვდომ დღეს კონკრეტული ნიშნისთვის
     */
    async getAvailableDays(signId: string): Promise<number[]> {
        if (this.loadingPromise) {
            await this.loadingPromise;
        }

        if (!this.currentMonthData) {
            return [];
        }

        const signData = this.currentMonthData.horoscopes[signId];
        if (!signData) {
            return [];
        }

        return Object.keys(signData).map(day => parseInt(day, 10)).sort((a, b) => a - b);
    }
}
