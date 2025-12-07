import { Routes } from '@angular/router';
import { Main } from './components/main/main/main';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Projects } from './components/projects/projects';

export const routes: Routes = [
  { path: '', component: Main },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  {path: 'projects', component: Projects},
  { path: '**', redirectTo: '' }
];
