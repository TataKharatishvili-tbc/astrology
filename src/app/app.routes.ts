import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'daily-horoscope',
        loadComponent: () => import('./features/daily-horoscope/daily-horoscope.component').then(m => m.DailyHoroscopeComponent)
    },
    {
        path: 'daily-horoscope/:id',
        loadComponent: () => import('./features/daily-horoscope/daily-horoscope.component').then(m => m.DailyHoroscopeComponent)
    },
    {
        path: 'monthly-horoscope',
        loadComponent: () => import('./features/monthly-horoscope/monthly-horoscope.component').then(m => m.MonthlyHoroscopeComponent)
    },
    {
        path: 'monthly-horoscope/:id',
        loadComponent: () => import('./features/monthly-horoscope/monthly-horoscope.component').then(m => m.MonthlyHoroscopeComponent)
    },
    {
        path: 'yearly-horoscope',
        loadComponent: () => import('./features/yearly-horoscope/yearly-horoscope.component').then(m => m.YearlyHoroscopeComponent)
    },
    {
        path: 'yearly-horoscope/:id',
        loadComponent: () => import('./features/yearly-horoscope/yearly-horoscope.component').then(m => m.YearlyHoroscopeComponent)
    },
    {
        path: 'moon-phases',
        loadComponent: () => import('./features/moon-calendar/moon-calendar.component').then(m => m.MoonCalendarComponent)
    },
    {
        path: 'zodiac/:id',
        loadComponent: () => import('./features/zodiac-detail/zodiac-detail.component').then(m => m.ZodiacDetailComponent)
    },
    {
        path: 'numerology/life-path',
        loadComponent: () => import('./features/numerology/life-path/life-path.component').then(m => m.LifePathComponent)
    },
    {
        path: 'numerology/birthday-number',
        loadComponent: () => import('./features/numerology/birthday-number/birthday-number.component').then(m => m.BirthdayNumberComponent)
    },
    {
        path: 'numerology/name',
        loadComponent: () => import('./features/numerology/name-number/name-number.component').then(m => m.NameNumberComponent)
    },
    {
        path: 'compatibility',
        loadComponent: () => import('./features/compatibility/compatibility.component').then(m => m.CompatibilityComponent)
    },
    {
        path: 'elements',
        loadComponent: () => import('./features/elements/elements.component').then(m => m.ElementsComponent)
    },
    {
        path: 'planets',
        loadComponent: () => import('./features/planets/planets.component').then(m => m.PlanetsComponent)
    },
    {
        path: 'zodiac',
        loadComponent: () => import('./features/zodiac-signs/zodiac-signs.component').then(m => m.ZodiacSignsComponent)
    },
    // მომავალში დაემატება დანარჩენი როუთები
    {
        path: '**',
        redirectTo: ''
    }
];
