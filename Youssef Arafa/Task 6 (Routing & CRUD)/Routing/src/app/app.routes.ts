import { Routes } from '@angular/router';

import { Section2 } from './Components/section2/section2';
import { Section1 } from './Components/section1/section1';

export const routes: Routes = [
  { path: 'about', component: Section1 },
  { path: 'about-reverse', component: Section2 },

  // Default route → redirect to about
  { path: '', redirectTo: 'about', pathMatch: 'full' },

  // Wildcard
  { path: '**', redirectTo: 'about' }
];
