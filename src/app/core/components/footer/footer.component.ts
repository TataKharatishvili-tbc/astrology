import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface FooterLink {
  label: string;
  path: string;
}

interface FooterSection {
  title: string;
  icon: string;
  links: FooterLink[];
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color: string;
}

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  footerSections: FooterSection[] = [
    {
      title: 'ჰოროსკოპი',
      icon: 'fa-solid fa-star',
      links: [
        { label: 'დღიური ჰოროსკოპი', path: '/daily-horoscope' },
        { label: 'კვირის ჰოროსკოპი', path: '/weekly-horoscope' },
        { label: 'თვიური ჰოროსკოპი', path: '/monthly-horoscope' },
        { label: 'წლიური ჰოროსკოპი', path: '/yearly-horoscope' }
      ]
    },
    {
      title: 'ზოდიაქო',
      icon: 'fa-solid fa-circle-nodes',
      links: [
        { label: 'ყველა ნიშანი', path: '/zodiac-signs' },
        { label: 'შეთავსებები', path: '/compatibility' },
        { label: 'ელემენტები', path: '/elements' },
        { label: 'პლანეტები', path: '/planets' }
      ]
    },
    {
      title: 'მთვარე',
      icon: 'fa-solid fa-moon',
      links: [
        { label: 'მთვარის კალენდარი', path: '/moon-phases' },
        { label: 'მთვარის რჩევები', path: '/moon-advice' },
        { label: 'ახალი მთვარე', path: '/new-moon' },
        { label: 'სავსე მთვარე', path: '/full-moon' }
      ]
    },
    {
      title: 'ნუმეროლოგია',
      icon: 'fa-solid fa-calculator',
      links: [
        { label: 'ცხოვრების გზის რიცხვი', path: '/numerology/life-path' },
        { label: 'დაბადების დღის რიცხვი', path: '/numerology/birthday' },
        { label: 'სახელის რიცხვი', path: '/numerology/name' },
        { label: 'პირადი წლის რიცხვი', path: '/numerology/personal-year' }
      ]
    },
    {
      title: 'სხვა',
      icon: 'fa-solid fa-compass',
      links: [
        { label: 'ნატალური რუკა', path: '/natal-chart' },
        { label: 'სტატიები', path: '/articles' },
        { label: 'ჩვენ შესახებ', path: '/about' },
        { label: 'კონტაქტი', path: '/contact' }
      ]
    }
  ];

  socialLinks: SocialLink[] = [
    {
      name: 'Facebook',
      icon: 'fa-brands fa-facebook',
      url: 'https://facebook.com',
      color: '#1877f2'
    },
    {
      name: 'Instagram',
      icon: 'fa-brands fa-instagram',
      url: 'https://instagram.com',
      color: '#e4405f'
    },
    {
      name: 'Twitter',
      icon: 'fa-brands fa-twitter',
      url: 'https://twitter.com',
      color: '#1da1f2'
    },
    {
      name: 'YouTube',
      icon: 'fa-brands fa-youtube',
      url: 'https://youtube.com',
      color: '#ff0000'
    },
    {
      name: 'TikTok',
      icon: 'fa-brands fa-tiktok',
      url: 'https://tiktok.com',
      color: '#000000'
    }
  ];
}
