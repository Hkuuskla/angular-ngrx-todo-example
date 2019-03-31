import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/services/auth.guard';
import { TaskPageComponent } from './containers/task-page/task-page.component';

const routes: Routes = [
  {
    path: '',
    component: TaskPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
