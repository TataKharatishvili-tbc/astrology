import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ZodiacService } from '../../core/services/zodiac.service';
import { ZodiacSign } from '../../core/models/astrology.models';

interface Feature {
  title: string;
  description: string;
  icon: string;
  link: string;
  gradient: string;
}

interface Star {
  left: number;
  top: number;
  delay: number;
  size: number;
  duration: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  zodiacSigns: ZodiacSign[] = [];
  stars: Star[] = [];

  constructor(private zodiacService: ZodiacService) {}

  ngOnInit() {
    this.zodiacSigns = this.zodiacService.getAllSigns();
    this.generateStars();
  }

  getCurrentDate(): string {
    const months = ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 
                    'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'];
    const days = ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'];
    const now = new Date();
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    return `${dayName}, ${day} ${month}, ${year}`;
  }

  getZodiacIcon(signId: string): string {
    const icons: { [key: string]: string } = {
      'aries': 'fa-solid fa-mars',           // ვერძი
      'taurus': 'fa-solid fa-venus',         // კურო
      'gemini': 'fa-solid fa-mercury',       // ტყუპები
      'cancer': 'fa-solid fa-moon',          // კირჩხიბი
      'leo': 'fa-solid fa-sun',              // ლომი
      'virgo': 'fa-solid fa-mercury',        // ქალწული
      'libra': 'fa-solid fa-venus',          // სასწორი
      'scorpio': 'fa-solid fa-mars',         // მორიელი
      'sagittarius': 'fa-solid fa-jupiter',  // მშვილდოსანი
      'capricorn': 'fa-solid fa-saturn',     // თხის რქა
      'aquarius': 'fa-solid fa-uranus',      // მერწყული
      'pisces': 'fa-solid fa-neptune'        // თევზები
    };
    return icons[signId] || 'fa-solid fa-star';
  }

  getZodiacIconClass(zodiacId: string): string {
    const iconMap: {[key: string]: string} = {
      'aries': 'fas fa-fire',
      'taurus': 'fas fa-mountain',
      'gemini': 'fas fa-wind',
      'cancer': 'fas fa-water',
      'leo': 'fas fa-crown',
      'virgo': 'fas fa-leaf',
      'libra': 'fas fa-balance-scale',
      'scorpio': 'fas fa-spider',
      'sagittarius': 'fas fa-bow-arrow',
      'capricorn': 'fas fa-mountain-sun',
      'aquarius': 'fas fa-droplet',
      'pisces': 'fas fa-fish'
    };
    return iconMap[zodiacId] || 'fas fa-star';
  }

  getElementIcon(element: string): string {
    const icons: {[key: string]: string} = {
      'fire': 'fas fa-fire',
      'earth': 'fas fa-mountain',
      'air': 'fas fa-wind',
      'water': 'fas fa-water'
    };
    return icons[element] || 'fas fa-star';
  }

  generateStars() {
    // გენერირება 5-6 წერტილისა
    const count = 5 + Math.floor(Math.random() * 2); // 5 ან 6
    for (let i = 0; i < count; i++) {
      this.stars.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        size: 1 + Math.random() * 2, // 1-3px
        duration: 15 + Math.random() * 10 // 15-25 წამი
      });
    }
  }

  features: Feature[] = [
    {
      title: 'დღიური ჰოროსკოპი',
      description: 'ყოველდღიური პროგნოზი თქვენი ზოდიაქოს ნიშნისთვის',
      icon: '☀️',
      link: '/daily-horoscope',
      gradient: 'gradient-fire'
    },
    {
      title: 'თვიური ჰოროსკოპი',
      description: 'გრძელვადიანი პროგნოზი მომავალი თვისთვის',
      icon: '🌙',
      link: '/monthly-horoscope',
      gradient: 'gradient-ocean'
    },
    {
      title: 'შეთავსებები',
      description: 'გაიგეთ თქვენი თავსებადობა სხვა ნიშნებთან',
      icon: '💕',
      link: '/compatibility',
      gradient: 'gradient-sunset'
    },
    {
      title: 'მთვარის ფაზები',
      description: 'მთვარის ფაზების კალენდარი და რჩევები',
      icon: '🌕',
      link: '/moon-phases',
      gradient: 'gradient-mystical'
    },
    {
      title: 'ნატალური რუკა',
      description: 'შეიქმენით და გაანალიზეთ თქვენი ნატალური რუკა',
      icon: '🔮',
      link: '/natal-chart',
      gradient: 'gradient-cosmic'
    },
    {
      title: 'წლიური პროგნოზი',
      description: 'სრული წლის დეტალური ასტროლოგიური პროგნოზი',
      icon: '⭐',
      link: '/yearly-horoscope',
      gradient: 'gradient-fire'
    }
  ];

  moonPhases = [
    { name: 'ახალი მთვარე', icon: '🌑', date: '18 დეკ' },
    { name: 'მზარდი მთვარე', icon: '🌓', date: '25 დეკ' },
    { name: 'სავსე მთვარე', icon: '🌕', date: '2 იან' },
    { name: 'კლებადი მთვარე', icon: '🌗', date: '9 იან' }
  ];
}
