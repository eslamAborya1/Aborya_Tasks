import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  skills: Skill[] = [
    { icon: 'fa-brands fa-html5', name: 'HTML' },
    { icon: 'fa-brands fa-css3-alt', name: 'CSS' },
    { icon: 'fa-brands fa-js', name: 'JavaScript' },
    { icon: 'fa-brands fa-angular', name: 'Angular' },
    { icon: 'fa-brands fa-java', name: 'Java' },
    { icon: 'fa-solid fa-leaf', name: 'Spring Boot' },
    { icon: 'fa-brands fa-git-alt', name: 'Git' },
    { icon: 'fa-brands fa-github', name: 'GitHub' },
  ];
}
