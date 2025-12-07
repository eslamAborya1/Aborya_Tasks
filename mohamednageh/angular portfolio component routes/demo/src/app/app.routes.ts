import { Routes } from '@angular/router';
import {Portfolio} from './component/portfolio/portfolio';
import {About} from './component/about/about';
import {Experience} from './component/experience/experience';
import {Skills} from './component/skills/skills';
import {Contact} from './component/contact/contact';

export const routes: Routes = [
  { path: '', component: Portfolio },
  { path: 'about', component: About },
  { path: 'experience', component: Experience },
  { path: 'skills', component: Skills },
  { path: 'contact', component: Contact },
];
