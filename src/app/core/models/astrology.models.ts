// ===================================
// ზოდიაქოს ნიშნის ინტერფეისი
// ===================================

export type ZodiacElement = 'fire' | 'earth' | 'air' | 'water';

export type ZodiacQuality = 'cardinal' | 'fixed' | 'mutable';

export interface ZodiacSign {
    id: string;
    name: string;
    nameEn: string;
    symbol: string;
    emoji: string;
    element: ZodiacElement;
    quality: ZodiacQuality;
    rulingPlanet: string;
    dates: {
        start: { month: number; day: number };
        end: { month: number; day: number };
    };
    dateRange: string;
    traits: {
        positive: string[];
        negative: string[];
    };
    description: string;
    compatibility: {
        best: string[];
        good: string[];
        challenging: string[];
    };
    career: string[];
    luckyNumbers: number[];
    luckyColors: string[];
    luckyDay: string;
}

// ===================================
// ჰოროსკოპის ტიპები
// ===================================

export type HoroscopeType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Horoscope {
    signId: string;
    type: HoroscopeType;
    date: Date;
    content: {
        general: string;
        love: string;
        career: string;
        health: string;
        finance: string;
    };
    luckyNumber?: number;
    luckyColor?: string;
    rating: {
        overall: number;
        love: number;
        career: number;
        health: number;
    };
}

// ===================================
// შეთავსებობის ინტერფეისი
// ===================================

export type CompatibilityType = 'romantic' | 'friendship' | 'business' | 'sexual';

export interface Compatibility {
    sign1: string;
    sign2: string;
    type: CompatibilityType;
    overallScore: number; // 0-100
    breakdown: {
        communication: number;
        emotional: number;
        values: number;
        intimacy: number;
        trust: number;
    };
    strengths: string[];
    challenges: string[];
    advice: string;
    description: string;
}

// ===================================
// მთვარის ფაზები
// ===================================

export type MoonPhase =
    | 'new-moon'
    | 'waxing-crescent'
    | 'first-quarter'
    | 'waxing-gibbous'
    | 'full-moon'
    | 'waning-gibbous'
    | 'last-quarter'
    | 'waning-crescent';

export interface MoonPhaseInfo {
    phase: MoonPhase;
    name: string;
    nameEn: string;
    date: Date;
    illumination: number; // 0-100
    emoji: string;
    meaning: string;
    advice: string[];
    bestFor: string[];
    avoidFor: string[];
}

// ===================================
// ნატალური რუკა
// ===================================

export interface BirthData {
    date: Date;
    time: string;
    location: {
        latitude: number;
        longitude: number;
        city: string;
        country: string;
    };
}

export interface NatalChart {
    birthData: BirthData;
    sunSign: string;
    moonSign: string;
    risingSign: string;
    planets: {
        mercury: string;
        venus: string;
        mars: string;
        jupiter: string;
        saturn: string;
        uranus: string;
        neptune: string;
        pluto: string;
    };
    houses: {
        [key: number]: string;
    };
    aspects: ChartAspect[];
    interpretation: string;
}

export interface ChartAspect {
    planet1: string;
    planet2: string;
    aspectType: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile';
    degree: number;
    interpretation: string;
}
