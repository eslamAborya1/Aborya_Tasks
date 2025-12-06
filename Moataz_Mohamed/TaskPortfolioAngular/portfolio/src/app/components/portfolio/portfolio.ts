import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with Angular frontend',
      tech: 'Angular , Json File',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: 'https://github.com/MooatazMohamed/e-commerce_live'
    },
    {
      title: 'Library Managment System',
      description: 'Library Management System for reading and buying books',
      tech: 'Angular , TypeScript , Json File , Angular Component , Bootstrap',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: 'https://github.com/MooatazMohamed/Library-'
    },
    {
      title: 'Netflix',
      description: 'Full web site for watching all movies',
      tech: 'Angular , TypeScript Angular Component , Bootstrap',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: 'https://github.com/MooatazMohamed/Netflix'
    }
  ];
}
