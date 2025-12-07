import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/task-list/task-list.component').then(
        m => m.TaskListComponent
      ),
    data: { title: 'Dashboard' }
  },
  {
    path: 'task/:id',
    loadComponent: () =>
      import('./components/task-detail/task-detail.component').then(
        m => m.TaskDetailComponent
      ),
    data: { title: 'Task Details' }
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/task-form/task-form.component').then(
        m => m.TaskFormComponent
      ),
    data: { title: 'Create Task' }
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/task-form/task-form.component').then(
        m => m.TaskFormComponent
      ),
    data: { title: 'Edit Task' }
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(
        m => m.AboutComponent
      ),
    data: { title: 'About' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
