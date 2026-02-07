import { Injectable } from '@angular/core';

export interface MonthlyHoroscope {
    general: string;
    love: string;
    career: string;
    health: string;
    finance: string;
    luckyNumber: number;
    luckyColor: string;
}

interface MonthlyHoroscopeData {
    year: number;
    horoscopes: {
        [signId: string]: {
            [month: string]: MonthlyHoroscope;
        };
    };
}

@Injectable({
    providedIn: 'root'
})
export class MonthlyHoroscopeService {
    private monthlyData: MonthlyHoroscopeData | null = null;
    private currentYear: number | null = null;
    private loadingPromise: Promise<void> | null = null;

    constructor() {
        this.loadCurrentYear();
    }

    private async loadCurrentYear(): Promise<void> {
        const now = new Date();
        const year = now.getFullYear();

        // თუ უკვე ამ წლის მონაცემები ჩატვირთულია, არაფერი გავაკეთოთ
        if (this.currentYear === year && this.monthlyData) {
            return;
        }

        this.currentYear = year;

        try {
            // ვტვირთავთ წლის მონაცემებს fetch-ით
            const response = await fetch(`/data/monthly-horoscopes-${year}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.monthlyData = await response.json();
            console.log(`Monthly horoscopes for ${year} loaded successfully`);
        } catch (error) {
            console.error(`Failed to load monthly horoscopes for year ${year}:`, error);
            this.monthlyData = null;
        }
    }

    /**
     * იღებს თვიურ ჰოროსკოპს კონკრეტული ზოდიაქოს ნიშნისთვის და თვისთვის
     */
    async getMonthlyHoroscope(signId: string, month: number, year?: number): Promise<MonthlyHoroscope | null> {
        // ვრწმუნდებით, რომ მონაცემები ჩატვირთულია
        if (this.loadingPromise) {
            await this.loadingPromise;
        }

        const targetYear = year || new Date().getFullYear();

        // თუ საჭიროა სხვა წლის მონაცემები, ვტვირთავთ მათ
        if (targetYear !== this.currentYear) {
            await this.loadYear(targetYear);
        }

        if (!this.monthlyData || !this.monthlyData.horoscopes[signId]) {
            console.log(`No monthly horoscope data found for ${signId}`);
            return null;
        }

        const horoscope = this.monthlyData.horoscopes[signId][month.toString()];

        if (!horoscope) {
            console.log(`No horoscope found for ${signId} in month ${month}`);
            return null;
        }

        return horoscope;
    }

    /**
     * იღებს მიმდინარე თვის ჰოროსკოპს
     */
    async getCurrentMonthHoroscope(signId: string): Promise<MonthlyHoroscope | null> {
        const now = new Date();
        const month = now.getMonth() + 1; // JavaScript-ში თვეები იწყება 0-დან
        return this.getMonthlyHoroscope(signId, month);
    }

    /**
     * ტვირთავს კონკრეტული წლის მონაცემებს
     */
    private async loadYear(year: number): Promise<void> {
        if (this.currentYear === year && this.monthlyData) {
            return;
        }

        this.currentYear = year;

        try {
            const response = await fetch(`/data/monthly-horoscopes-${year}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.monthlyData = await response.json();
            console.log(`Monthly horoscopes for ${year} loaded successfully`);
        } catch (error) {
            console.error(`Failed to load monthly horoscopes for year ${year}:`, error);
            this.monthlyData = null;
            throw error;
        }
    }

    /**
     * იღებს ყველა ხელმისაწვდომ თვეს მიმდინარე წლისთვის
     */
    getAvailableMonths(signId: string): number[] {
        if (!this.monthlyData || !this.monthlyData.horoscopes[signId]) {
            return [];
        }

        return Object.keys(this.monthlyData.horoscopes[signId])
            .map(month => parseInt(month))
            .sort((a, b) => a - b);
    }
}
