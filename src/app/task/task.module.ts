import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { TaskRoutingModule } from './task-routing.module';
import { TaskPageComponent } from './containers/task-page/task-page.component';
import { TaskCreatorComponent } from './components/task-creator/task-creator.component';
import { TaskComponent } from './components/task/task.component';
import { SharedModule } from '../shared/shared.module';
import * as fromTask from './reducers/task.reducer';

@NgModule({
  declarations: [
    TaskPageComponent,
    TaskCreatorComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule,
    StoreModule.forFeature('task', fromTask.reducer),
  ]
})
export class TaskModule { }
