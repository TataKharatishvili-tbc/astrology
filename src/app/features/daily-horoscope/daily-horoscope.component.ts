import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ZodiacService } from '../../core/services/zodiac.service';
import { ZodiacSign } from '../../core/models/astrology.models';

@Component({
  selector: 'app-daily-horoscope',
  imports: [CommonModule, RouterLink],
  templateUrl: './daily-horoscope.component.html',
  styleUrl: './daily-horoscope.component.scss'
})
export class DailyHoroscopeComponent implements OnInit {
  selectedSign?: ZodiacSign;
  allSigns: ZodiacSign[] = [];
  horoscopeContent = {
    general: '',
    love: '',
    career: '',
    health: '',
    lucky: ''
  };

  constructor(
    private route: ActivatedRoute,
    private zodiacService: ZodiacService
  ) {}

  ngOnInit() {
    this.allSigns = this.zodiacService.getAllSigns();
    
    this.route.params.subscribe(params => {
      const signId = params['id'];
      if (signId) {
        this.selectedSign = this.zodiacService.getSignById(signId);
        this.generateHoroscope();
      } else {
        this.selectedSign = this.allSigns[0];
        this.generateHoroscope();
      }
    });
  }

  selectSign(sign: ZodiacSign) {
    this.selectedSign = sign;
    this.generateHoroscope();
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

  private generateHoroscope() {
    if (!this.selectedSign) return;

    this.horoscopeContent = {
      general: `დღეს ${this.selectedSign.name}-ებს ელოდებათ საინტერესო შესაძლებლობები. ვარსკვლავები ხელსაყრელ პოზიციაშია და გირჩევენ გაბედულად იმოქმედოთ. ახალი იდეების განხორციელება შესანიშნავ შედეგებს მოიტანს.`,
      love: `რომანტიკული ურთიერთობები განსაკუთრებით ჰარმონიულია. სინგლებს შეუძლიათ საინტერესო ადამიანი გაიცნონ, ხოლო წყვილებს - ერთმანეთთან უფრო ახლოს გახდნენ. გულწრფელობა და გახსნილობა აუცილებელია.`,
      career: `პროფესიულ სფეროში გელოდებათ აღიარება და წარმატება. თქვენი შრომა და ძალისხმევა შენიშნული იქნება. კარგი დროა ახალი პროექტების დასაწყებად ან კარიერული ზრდისთვის.`,
      health: `ჯანმრთელობის მდგომარეობა სტაბილურია, მაგრამ არ დაგვიწყდეთ რეჟიმის დაცვა და ფიზიკური აქტივობა. დასვენება და რელაქსაციაც მნიშვნელოვანია ენერგიის აღსადგენად.`,
      lucky: `საბედნიერო რიცხვები: ${this.selectedSign.luckyNumbers.join(', ')} | საბედნიერო ფერი: ${this.selectedSign.luckyColors[0]} | საბედნიერო დღე: ${this.selectedSign.luckyDay}`
    };
  }
}
