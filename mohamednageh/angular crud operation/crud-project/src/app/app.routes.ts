import { Routes } from '@angular/router';
import {HomeComponent} from './components/home-component/home-component';
import {ManageComponent} from './components/manage-component/manage-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'manage', component: ManageComponent },
  { path: '**', redirectTo: '' }
];
