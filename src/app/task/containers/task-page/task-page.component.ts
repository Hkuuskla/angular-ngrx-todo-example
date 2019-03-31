import { take, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TaskService } from '../../services/task.service';
import * as fromTask from '../../reducers/task.reducer';
import { Task } from '../../models/task';
import { PartialTask } from '../../models/partial-task';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit {

  taskList$: Observable<Task[]>;

  constructor(private taskService: TaskService, private taskStore: Store<fromTask.State>) {
    this.taskList$ = taskStore.pipe(
      select(fromTask.getTaskList),
      map((taskList: Task[]) => taskList.sort((a, b) => b.id - a.id))
    );
  }

  ngOnInit() {
    this.taskService.getTaskList();
  }

  createTask(partialTask: PartialTask) {
    this.taskService.createTask(partialTask);
  }

  updateTask(partialTask: PartialTask) {
    this.taskService.updateTask(partialTask);
  }

  removeTask(id: number) {
    this.taskService.removeTask(id);
  }
}
