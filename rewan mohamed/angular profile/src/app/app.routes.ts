import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about-component/about-component';
import { SkillsComponent } from './pages/skills-component/skills-component';
import { ProjectsComponent } from './pages/projects-component/projects-component';

export const routes: Routes = [
     { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'projects', component: ProjectsComponent }
];
