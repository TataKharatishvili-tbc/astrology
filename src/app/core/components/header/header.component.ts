import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  label: string;
  path?: string;
  icon: string;
  children?: SubMenuItem[];
}

interface SubMenuItem {
  label: string;
  path: string;
  description?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeDropdown: string | null = null;

  // ნავიგაციის მენიუ dropdown-ებით
  menuItems: MenuItem[] = [
    {
      label: 'ჰოროსკოპი',
      icon: 'fa-solid fa-star',
      children: [
        {
          label: 'დღიური ჰოროსკოპი',
          path: '/daily-horoscope',
          description: 'დღევანდელი პროგნოზი'
        },
        {
          label: 'კვირის ჰოროსკოპი',
          path: '/weekly-horoscope',
          description: 'მიმდინარე კვირის პროგნოზი'
        },
        {
          label: 'თვიური ჰოროსკოპი',
          path: '/monthly-horoscope',
          description: 'თვის დეტალური პროგნოზი'
        },
        {
          label: 'წლიური ჰოროსკოპი',
          path: '/yearly-horoscope',
          description: '2025 წლის პროგნოზი'
        }
      ]
    },
    {
      label: 'ზოდიაქო',
      icon: 'fa-solid fa-circle-nodes',
      children: [
        {
          label: 'ყველა ნიშანი',
          path: '/zodiac-signs',
          description: '12 ზოდიაქოს ნიშანი'
        },
        {
          label: 'შეთავსებები',
          path: '/compatibility',
          description: 'სასიყვარულო თავსებადობა'
        },
        {
          label: 'ელემენტები',
          path: '/elements',
          description: 'ცეცხლი, მიწა, ჰაერი, წყალი'
        },
        {
          label: 'პლანეტები',
          path: '/planets',
          description: 'მფარველი პლანეტები'
        }
      ]
    },
    {
      label: 'მთვარე',
      icon: 'fa-solid fa-moon',
      children: [
        {
          label: 'მთვარის კალენდარი',
          path: '/moon-phases',
          description: 'სრული კალენდარი'
        },
        {
          label: 'მთვარის რჩევები',
          path: '/moon-advice',
          description: 'რას აკეთოთ ფაზების მიხედვით'
        },
        {
          label: 'ახალი მთვარე',
          path: '/new-moon',
          description: 'ახალი დაწყებები'
        },
        {
          label: 'სავსე მთვარე',
          path: '/full-moon',
          description: 'კულმინაცია და გამოვლინება'
        }
      ]
    },
    {
      label: 'ნატალური რუკა',
      path: '/natal-chart',
      icon: 'fa-solid fa-compass'
    },
    {
      label: 'ნუმეროლოგია',
      icon: 'fa-solid fa-calculator',
      children: [
        {
          label: 'ცხოვრების გზის რიცხვი',
          path: '/numerology/life-path',
          description: 'ბედის რიცხვი დაბადების თარიღით'
        },
        {
          label: 'დაბადების დღის რიცხვი',
          path: '/numerology/birthday',
          description: 'პიროვნული მახასიათებლები'
        },
        {
          label: 'სახელის რიცხვი',
          path: '/numerology/name',
          description: 'სახელის ნუმეროლოგია'
        },
        {
          label: 'პირადი წლის რიცხვი',
          path: '/numerology/personal-year',
          description: 'წლის ტენდენციები და პროგნოზი'
        }
      ]
    },
    {
      label: 'სტატიები',
      icon: 'fa-solid fa-book-open',
      children: [
        {
          label: 'ასტროლოგიის საფუძვლები',
          path: '/articles/basics',
          description: 'დამწყებთათვის'
        },
        {
          label: 'რეტროგრადული პლანეტები',
          path: '/articles/retrograde',
          description: 'გავლენა და მნიშვნელობა'
        },
        {
          label: 'ტრანზიტები',
          path: '/articles/transits',
          description: 'პლანეტური ტრანზიტები'
        }
      ]
    }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-item')) {
      this.activeDropdown = null;
    }
  }

  toggleDropdown(label: string, event?: MouseEvent) {
    event?.stopPropagation();
    this.activeDropdown = this.activeDropdown === label ? null : label;
  }

  closeDropdown() {
    this.activeDropdown = null;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.activeDropdown = null;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.activeDropdown = null;
  }

  isDropdownOpen(label: string): boolean {
    return this.activeDropdown === label;
  }
}
