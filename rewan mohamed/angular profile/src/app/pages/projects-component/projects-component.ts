import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-component',
  imports: [],
  templateUrl: './projects-component.html',
  styleUrl: './projects-component.css',
})
export class ProjectsComponent implements OnInit {
  projects: {title:string ,description:string , technologies: string[], image:string}[] = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with payment integration and user management.',
      technologies: ['Angular', 'Node.js', 'MongoDB'],
      image: 'imge-section.jpg'
    },
    {
      title: 'Portfolio Website',
      description: 'Modern and responsive portfolio website with smooth animations and interactive elements.',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      image: 'imge-section.jpg'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates and notifications.',
      technologies: ['React', 'Firebase', 'Material-UI'],
      image: 'imge-section.jpg'
    },
    {
      title: 'Weather Dashboard',
      description: 'Interactive weather dashboard with location-based forecasts and weather alerts.',
      technologies: ['Vue.js', 'API Integration', 'Chart.js'],
      image: 'imge-section.jpg'
    },
    {
      title: 'Social Media App',
      description: 'Social networking platform with post sharing, comments, and user profiles.',
      technologies: ['Angular', 'Express', 'PostgreSQL'],
      image: 'imge-section.jpg'
    },
    {
      title: 'Blog Platform',
      description: 'Content management system for bloggers with rich text editor and SEO optimization.',
      technologies: ['WordPress', 'PHP', 'MySQL'],
      image: 'imge-section.jpg'
    }
  ];

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
