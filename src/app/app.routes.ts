import { TaskComponent } from './components/task/task.component';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';

const APP_ROUTES: Routes = [
  { path: 'tasks', component: TasksComponent },
  { path: 'task/:id', component: TaskComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'tasks' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
