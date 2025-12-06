import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  skills = [
    { icon: 'fas fa-server', title: 'Backend Development', description: 'Java, Spring Boot, Hibernate, REST APIs, Microservices, PostgreSQL, MySQL' },
    { icon: 'fas fa-desktop', title: 'Frontend Development', description: 'HTML5, CSS3, JavaScript, Angular, Tailwind , Bootstrap, Thymeleaf, Responsive Design' },
    { icon: 'fas fa-tools', title: 'DevOps & Tools', description: 'Docker, Jenkins, Git, Maven, AWS, Linux, JUnit, Mockito, IntelliJ IDEA' },
    { icon: 'fas fa-chart-line', title: 'Methodologies', description: 'Agile/Scrum, TDD, CI/CD, Clean Architecture, Design Patterns, Code Reviews' }
  ];
}
