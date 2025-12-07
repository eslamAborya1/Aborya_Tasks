import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Experience } from './experience/experience';
import { Skills } from './skills/skills';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'experience', component: Experience },
  { path: 'skills', component: Skills },
  { path: 'contact', component: Contact },
];
