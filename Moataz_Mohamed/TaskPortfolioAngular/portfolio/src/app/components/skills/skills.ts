import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, FormsModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
backendSkills = [
    {
      category: 'Backend',
      skills: [
        { name: 'Java & Spring Boot', percent: 90 },
        { name: 'RESTful APIs', percent: 90 },
        { name: 'Database Design & SQL', percent: 88 },
        { name: 'Microservices Architecture', percent: 85 }
      ]
    }
  ];

  frontendSkills = [
    {
      category: 'Frontend & DevOps',
      skills: [
        { name: 'HTML5, CSS3, JavaScript', percent: 96 },
        { name: 'Angular & Bootstrap', percent: 95 },
        { name: 'Docker & DevOps', percent: 80 },
        { name: 'AWS & Cloud Services', percent: 78 }
      ]
    }
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateProgressBars();
    }, 100);
  }

  private animateProgressBars(): void {
    const progressBars = document.querySelectorAll<HTMLElement>('.progress-bar');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target as HTMLElement;
          const targetWidth = bar.getAttribute('data-width');
          if (targetWidth) {
            bar.style.width = targetWidth + '%';
          }
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
      observer.observe(bar);
    });
  }
}
