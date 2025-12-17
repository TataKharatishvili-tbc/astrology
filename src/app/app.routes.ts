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
  // მომავალში დაემატება დანარჩენი როუთები
  {
    path: '**',
    redirectTo: ''
  }
];
