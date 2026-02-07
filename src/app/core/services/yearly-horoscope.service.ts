import { Injectable } from '@angular/core';

export interface YearlyHoroscope {
    general: string;
    love: string;
    career: string;
    health: string;
    finance: string;
    luckyNumber: number;
    luckyColor: string;
}

interface YearlyHoroscopeData {
    horoscopes: {
        [year: string]: {
            [signId: string]: YearlyHoroscope;
        };
    };
}

@Injectable({
    providedIn: 'root'
})
export class YearlyHoroscopeService {
    private yearlyData: YearlyHoroscopeData | null = null;
    private loadingPromise: Promise<void> | null = null;

    constructor() {
        this.loadingPromise = this.loadYearlyData();
    }

    private async loadYearlyData(): Promise<void> {
        try {
            // ყველა წლის მონაცემები ერთ ფაილშია
            const response = await fetch('/data/yearly-horoscopes.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.yearlyData = await response.json();
            console.log('Yearly horoscopes loaded successfully');
        } catch (error) {
            console.error('Failed to load yearly horoscopes:', error);
            this.yearlyData = null;
        }
    }

    /**
     * იღებს წლიურ ჰოროსკოპს კონკრეტული ზოდიაქოს ნიშნისთვის და წლისთვის
     */
    async getYearlyHoroscope(signId: string, year: number): Promise<YearlyHoroscope | null> {
        // ვრწმუნდებით, რომ მონაცემები ჩატვირთულია
        if (this.loadingPromise) {
            await this.loadingPromise;
        }

        if (!this.yearlyData || !this.yearlyData.horoscopes[year.toString()]) {
            console.log(`No yearly horoscope data found for year ${year}`);
            return null;
        }

        const horoscope = this.yearlyData.horoscopes[year.toString()][signId];

        if (!horoscope) {
            console.log(`No horoscope found for ${signId} in year ${year}`);
            return null;
        }

        return horoscope;
    }

    /**
     * იღებს მიმდინარე წლის ჰოროსკოპს
     */
    async getCurrentYearHoroscope(signId: string): Promise<YearlyHoroscope | null> {
        const currentYear = new Date().getFullYear();
        return this.getYearlyHoroscope(signId, currentYear);
    }

    /**
     * იღებს ყველა ხელმისაწვდომ წელს
     */
    async getAvailableYears(): Promise<number[]> {
        // ვრწმუნდებით, რომ მონაცემები ჩატვირთულია
        if (this.loadingPromise) {
            await this.loadingPromise;
        }

        if (!this.yearlyData) {
            return [];
        }

        return Object.keys(this.yearlyData.horoscopes)
            .map(year => parseInt(year))
            .sort((a, b) => a - b);
    }

    /**
     * იღებს წლიურ ჰოროსკოპს ყველა ზოდიაქოს ნიშნისთვის კონკრეტული წლისთვის
     */
    async getAllSignsForYear(year: number): Promise<{ [signId: string]: YearlyHoroscope } | null> {
        // ვრწმუნდებით, რომ მონაცემები ჩატვირთულია
        if (this.loadingPromise) {
            await this.loadingPromise;
        }

        if (!this.yearlyData || !this.yearlyData.horoscopes[year.toString()]) {
            console.log(`No yearly horoscope data found for year ${year}`);
            return null;
        }

        return this.yearlyData.horoscopes[year.toString()];
    }
}
