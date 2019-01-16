import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';

const APP_ROUTES: Routes = [
  { path: 'tasks', component: TasksComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'tasks' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
