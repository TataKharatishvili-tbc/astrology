import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ZodiacService } from '../../core/services/zodiac.service';
import { ZodiacSign } from '../../core/models/astrology.models';

@Component({
  selector: 'app-zodiac-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './zodiac-detail.component.html',
  styleUrl: './zodiac-detail.component.scss'
})
export class ZodiacDetailComponent implements OnInit {
  sign: ZodiacSign | null = null;
  allSigns: ZodiacSign[] = [];

  constructor(
    private route: ActivatedRoute,
    private zodiacService: ZodiacService
  ) {}

  ngOnInit() {
    this.allSigns = this.zodiacService.getAllSigns();
    
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.sign = this.zodiacService.getSignById(id) || null;
    });
  }

  getElementColor(element: string): string {
    const colors: {[key: string]: string} = {
      'ცეცხლი': '#f97316',
      'მიწა': '#84cc16',
      'ჰაერი': '#06b6d4',
      'წყალი': '#8b5cf6'
    };
    return colors[element] || '#8b5cf6';
  }

  getElementIcon(element: string): string {
    const icons: {[key: string]: string} = {
      'ცეცხლი': 'fas fa-fire',
      'მიწა': 'fas fa-mountain',
      'ჰაერი': 'fas fa-wind',
      'წყალი': 'fas fa-water'
    };
    return icons[element] || 'fas fa-star';
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

  getSignName(symbol: string): string {
    const sign = this.allSigns.find(s => s.symbol === symbol);
    return sign ? sign.name : symbol;
  }
}
