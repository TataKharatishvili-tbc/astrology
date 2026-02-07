import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface NameMeaning {
    number: number;
    title: string;
    description: string;
    traits: string[];
    strengths: string[];
    challenges: string[];
}

interface Star {
    left: number;
    top: number;
    delay: number;
    size: number;
    duration: number;
    type: 'twinkle' | 'moving' | 'static';
    brightness: number;
}

@Component({
    selector: 'app-name-number',
    imports: [CommonModule, FormsModule],
    templateUrl: './name-number.component.html',
    styleUrl: './name-number.component.scss'
})
export class NameNumberComponent implements OnInit {
    fullName: string = '';
    stars: Star[] = [];
    destinyNumber: number | null = null;
    soulUrgeNumber: number | null = null;
    personalityNumber: number | null = null;
    calculationSteps: string[] = [];
    showResult = false;

    // Pythagorean ნუმეროლოგიური ცხრილი
    letterValues: { [key: string]: number } = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
        'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
        'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8,
        // ქართული ასოები
        'ა': 1, 'ბ': 2, 'გ': 3, 'დ': 4, 'ე': 5, 'ვ': 6, 'ზ': 7, 'თ': 8, 'ი': 9,
        'კ': 1, 'ლ': 2, 'მ': 3, 'ნ': 4, 'ო': 5, 'პ': 6, 'ჟ': 7, 'რ': 8, 'ს': 9,
        'ტ': 1, 'უ': 2, 'ფ': 3, 'ქ': 4, 'ღ': 5, 'ყ': 6, 'შ': 7, 'ჩ': 8, 'ც': 9,
        'ძ': 1, 'წ': 2, 'ჭ': 3, 'ხ': 4, 'ჯ': 5, 'ჰ': 6
    };

    // ხმოვნები
    vowels = ['A', 'E', 'I', 'O', 'U', 'Y', 'ა', 'ე', 'ი', 'ო', 'უ'];

    nameMeanings: NameMeaning[] = [
        {
            number: 1,
            title: 'ლიდერი და პიონერი',
            description: 'თქვენი სახელის ენერგია გამოხატავს ლიდერობას, დამოუკიდებლობას და ინოვაციას. თქვენ ბუნებრივი მეთაური ხართ.',
            traits: ['დამოუკიდებელი', 'ინოვაციური', 'თავდაჯერებული', 'მიზანდასახული'],
            strengths: ['ლიდერობა', 'კრეატიულობა', 'გადაწყვეტილების მიღება'],
            challenges: ['ეგოიზმი', 'დომინირება', 'მოუთმენლობა']
        },
        {
            number: 2,
            title: 'დიპლომატი და მშვიდობისმოყვარე',
            description: 'თქვენი სახელის ვიბრაცია ფოკუსირებულია ჰარმონიაზე, თანამშრომლობასა და ურთიერთობებზე.',
            traits: ['თანამშრომლობის მოყვარული', 'მგრძნობიარე', 'დიპლომატიური', 'ინტუიციური'],
            strengths: ['ემპათია', 'მშვიდობისმოყვარეობა', 'თანამშრომლობა'],
            challenges: ['გადაჭარბებული მგრძნობელობა', 'გადაწყვეტილების უუნარობა']
        },
        {
            number: 3,
            title: 'შემოქმედი და კომუნიკატორი',
            description: 'თქვენი სახელი გამოხატავს კრეატიულობას, ოპტიმიზმსა და თვითგამოხატვას.',
            traits: ['კრეატიული', 'ოპტიმისტური', 'სოციალური', 'გამომხატველი'],
            strengths: ['შემოქმედება', 'კომუნიკაცია', 'ენთუზიაზმი'],
            challenges: ['ფოკუსის დაკარგვა', 'ზედმეტი ოპტიმიზმი']
        },
        {
            number: 4,
            title: 'მშენებელი და ორგანიზატორი',
            description: 'თქვენი სახელის ენერგია ასახავს სტაბილურობას, პრაქტიკულობასა და მოწესრიგებულობას.',
            traits: ['პრაქტიკული', 'საიმედო', 'დისციპლინირებული', 'შრომისმოყვარე'],
            strengths: ['ორგანიზაცია', 'საიმედოობა', 'გამძლეობა'],
            challenges: ['სიხისტე', 'ცვლილებების წინააღმდეგობა']
        },
        {
            number: 5,
            title: 'თავგადასავალი და თავისუფლების მოყვარული',
            description: 'თქვენი სახელი გამოხატავს თავისუფლებას, ცვლილებებსა და ავანტურიზმს.',
            traits: ['ავანტურისტი', 'თავისუფალი', 'მოქნილი', 'ცნობისმოყვარე'],
            strengths: ['ადაპტაცია', 'თავისუფლება', 'მრავალფეროვნება'],
            challenges: ['არასტაბილურობა', 'იმპულსურობა']
        },
        {
            number: 6,
            title: 'მზრუნველი და ჰარმონიზატორი',
            description: 'თქვენი სახელის ვიბრაცია ფოკუსირებულია სიყვარულზე, პასუხისმგებლობასა და ოჯახზე.',
            traits: ['მზრუნველი', 'პასუხისმგებელი', 'სიყვარულით აღსავსე', 'ჰარმონიული'],
            strengths: ['თანაგრძნობა', 'პასუხისმგებლობა', 'ჰარმონია'],
            challenges: ['გადაჭარბებული მზრუნველობა', 'თვითდავიწყება']
        },
        {
            number: 7,
            title: 'ფილოსოფოსი და მაძიებელი',
            description: 'თქვენი სახელი გამოხატავს სიბრძნეს, ანალიზსა და სულიერებას.',
            traits: ['ანალიტიკური', 'ინტროსპექტიული', 'სულიერი', 'ბრძენი'],
            strengths: ['სიბრძნე', 'ინტუიცია', 'სიღრმე'],
            challenges: ['იზოლაცია', 'გადაჭარბებული ანალიზი']
        },
        {
            number: 8,
            title: 'ხელმძღვანელი და მიღწევათა მქონე',
            description: 'თქვენი სახელის ენერგია ასახავს ძალაუფლებას, წარმატებასა და მატერიალურ მიღწევებს.',
            traits: ['ამბიციური', 'ძლიერი', 'პრაქტიკული', 'წარმატებული'],
            strengths: ['ლიდერობა', 'მენეჯმენტი', 'წარმატება'],
            challenges: ['მატერიალიზმი', 'ძალაუფლების ბოროტად გამოყენება']
        },
        {
            number: 9,
            title: 'ჰუმანისტი და მასწავლებელი',
            description: 'თქვენი სახელი გამოხატავს თანაგრძნობას, ალტრუიზმსა და უნივერსალურ სიყვარულს.',
            traits: ['თანაგრძნობიანი', 'ალტრუისტი', 'იდეალისტური', 'ბრძენი'],
            strengths: ['თანაგრძნობა', 'სიბრძნე', 'უნივერსალურობა'],
            challenges: ['იდეალიზმი', 'თვითდავიწყება']
        },
        {
            number: 11,
            title: 'სულიერი მესენჯერი (Master Number)',
            description: '11 არის Master Number - თქვენი სახელი ატარებს სულიერ განათებასა და ინტუიციას.',
            traits: ['ინტუიციური', 'შთაგონებული', 'სულიერი', 'იდეალისტური'],
            strengths: ['ინტუიცია', 'შთაგონება', 'სულიერება'],
            challenges: ['ნერვულობა', 'გადაჭარბებული სენსიტიურობა']
        },
        {
            number: 22,
            title: 'მთავარი მშენებელი (Master Number)',
            description: '22 არის Master Number - თქვენი სახელი ატარებს პრაქტიკული ოცნებების მანიფესტაციის ძალას.',
            traits: ['ვიზიონერი', 'პრაქტიკული', 'ძლიერი', 'ორგანიზებული'],
            strengths: ['მანიფესტაცია', 'ლიდერობა', 'პრაქტიკულობა'],
            challenges: ['გადაჭარბებული ამბიციურობა', 'დაძაბულობა']
        }
    ];

    ngOnInit() {
        this.generateStars();
    }

    generateStars() {
        const count = 150 + Math.floor(Math.random() * 50);

        for (let i = 0; i < count; i++) {
            let type: 'twinkle' | 'moving' | 'static';
            const rand = Math.random();
            if (rand < 0.4) {
                type = 'static';
            } else if (rand < 0.8) {
                type = 'twinkle';
            } else {
                type = 'moving';
            }

            this.stars.push({
                left: Math.random() * 100,
                top: Math.random() * 100,
                delay: Math.random() * 8,
                size: 0.5 + Math.random() * 2.5,
                duration: type === 'moving' ? 20 + Math.random() * 30 : 2 + Math.random() * 4,
                type: type,
                brightness: 0.3 + Math.random() * 0.7
            });
        }
    }

    calculate() {
        if (!this.fullName || this.fullName.trim() === '') {
            return;
        }

        this.calculationSteps = [];
        this.showResult = false;

        const cleanName = this.fullName.toUpperCase().replace(/[^A-ZА-Яაბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]/g, '');

        if (cleanName.length === 0) {
            return;
        }

        this.calculationSteps.push(`📝 სახელი: ${this.fullName}\n`);

        // 1. Destiny Number (ყველა ასო)
        this.calculationSteps.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        this.calculationSteps.push('1️⃣ DESTINY NUMBER (ბედის რიცხვი)');
        this.calculationSteps.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        this.calculationSteps.push('ყველა ასო:\n');

        let allLetters = '';
        let destinySum = 0;

        for (const letter of cleanName) {
            const value = this.letterValues[letter] || 0;
            destinySum += value;
            allLetters += `${letter}=${value}  `;
        }

        this.calculationSteps.push(allLetters);
        this.calculationSteps.push(`\nჯამი: ${destinySum}`);
        this.destinyNumber = this.reduceToSingleDigit(destinySum);
        this.calculationSteps.push(`✅ Destiny Number: ${this.destinyNumber}\n`);

        // 2. Soul Urge Number (მხოლოდ ხმოვნები)
        this.calculationSteps.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        this.calculationSteps.push('2️⃣ SOUL URGE NUMBER (სულის სურვილი)');
        this.calculationSteps.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        this.calculationSteps.push('მხოლოდ ხმოვნები:\n');

        let vowelLetters = '';
        let soulSum = 0;

        for (const letter of cleanName) {
            if (this.vowels.includes(letter)) {
                const value = this.letterValues[letter] || 0;
                soulSum += value;
                vowelLetters += `${letter}=${value}  `;
            }
        }

        this.calculationSteps.push(vowelLetters || 'არ არის ხმოვნები');
        this.calculationSteps.push(`\nჯამი: ${soulSum}`);
        this.soulUrgeNumber = this.reduceToSingleDigit(soulSum);
        this.calculationSteps.push(`✅ Soul Urge Number: ${this.soulUrgeNumber}\n`);

        // 3. Personality Number (მხოლოდ თანხმოვნები)
        this.calculationSteps.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        this.calculationSteps.push('3️⃣ PERSONALITY NUMBER (პიროვნების რიცხვი)');
        this.calculationSteps.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        this.calculationSteps.push('მხოლოდ თანხმოვნები:\n');

        let consonantLetters = '';
        let personalitySum = 0;

        for (const letter of cleanName) {
            if (!this.vowels.includes(letter)) {
                const value = this.letterValues[letter] || 0;
                personalitySum += value;
                consonantLetters += `${letter}=${value}  `;
            }
        }

        this.calculationSteps.push(consonantLetters);
        this.calculationSteps.push(`\nჯამი: ${personalitySum}`);
        this.personalityNumber = this.reduceToSingleDigit(personalitySum);
        this.calculationSteps.push(`✅ Personality Number: ${this.personalityNumber}`);

        this.showResult = true;
    }

    private reduceToSingleDigit(num: number): number {
        while (num > 9 && num !== 11 && num !== 22) {
            const digits = this.getDigits(num);
            const sum = digits.reduce((a, b) => a + b, 0);
            this.calculationSteps.push(`   ${num} → ${digits.join(' + ')} = ${sum}`);
            num = sum;
        }
        return num;
    }

    private getDigits(num: number): number[] {
        return num.toString().split('').map(d => parseInt(d));
    }

    getDestinyMeaning(): NameMeaning | null {
        if (!this.destinyNumber) return null;
        return this.nameMeanings.find(m => m.number === this.destinyNumber) || null;
    }

    getSoulUrgeMeaning(): NameMeaning | null {
        if (!this.soulUrgeNumber) return null;
        return this.nameMeanings.find(m => m.number === this.soulUrgeNumber) || null;
    }

    getPersonalityMeaning(): NameMeaning | null {
        if (!this.personalityNumber) return null;
        return this.nameMeanings.find(m => m.number === this.personalityNumber) || null;
    }

    reset() {
        this.fullName = '';
        this.destinyNumber = null;
        this.soulUrgeNumber = null;
        this.personalityNumber = null;
        this.calculationSteps = [];
        this.showResult = false;
    }
}
