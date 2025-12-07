import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { PostDetail } from './components/post-detail/post-detail';
import { PostForm } from './components/post-form/post-form';
import { PostList } from './components/post-list/post-list';


export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: PostList },
  { path: 'posts/create', component: PostForm },
  { path: 'posts/edit/:id', component: PostForm },
  { path: 'posts/:id', component: PostDetail }
];
