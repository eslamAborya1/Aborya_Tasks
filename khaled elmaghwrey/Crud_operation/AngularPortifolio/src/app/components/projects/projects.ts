import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  showAddForm = false;
  newProject: Project = { id: 0, title: '', description: '', icon: '' };
  projects: Project[] = [];
  



  ngOnInit(): void {
    this.projects = [
      { id: 1, title: 'E-Commerce', description: 'Online store platform', icon: '🛒' },
      { id: 2, title: 'Social App', description: 'Mobile social app', icon: '📱' },
      { id: 3, title: 'Portfolio CMS', description: 'Manage portfolio items', icon: '💼' }
    ];
  }

  deleteProject(id: number) {
    this.projects = this.projects.filter(p => p.id !== id);
  }

  addProject() {
  const id = this.projects.length + 1;

  this.projects.push({
    id,
    title: this.newProject.title,
    description: this.newProject.description,
    icon: this.newProject.icon
  });

  this.newProject = { id: 0, title: '', description: '', icon: '' };
  this.showAddForm = false;
}

editProject(p: Project) {
  this.newProject = { ...p };
  this.showAddForm = true;
}

updateProject() {
  const index = this.projects.findIndex(x => x.id === this.newProject.id);
  this.projects[index] = this.newProject;
  this.showAddForm = false;
}

toggleAddForm() {
  this.showAddForm = !this.showAddForm;
}

saveNewProject() {
  if (!this.newProject.title.trim()) return;

  this.projects.push({ ...this.newProject });

  this.newProject = { id:0,title: '', icon: '', description: '' };
  this.showAddForm = false;
}
}