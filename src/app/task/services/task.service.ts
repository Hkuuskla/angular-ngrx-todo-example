import { Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, find, first, flatMap, take, map, mergeMap } from 'rxjs/operators';
import { throwError, of, Observable } from 'rxjs';

import { Task } from '../models/task';
import * as TaskActions from '../actions/task.actions';
import * as fromTask from '../reducers/task.reducer';
import { PartialTask } from '../models/partial-task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskUrl = '//localhost:3000/task';

  constructor(private http: HttpClient, private taskStore: Store<fromTask.State>) { }

  getTaskList(): void {
    this.taskStore.dispatch(new TaskActions.GetTaskList());

    this.http.get<Task[]>(this.taskUrl)
    .pipe(
      take(1),
      tap((task: Task[]) => {
        this.taskStore.dispatch(new TaskActions.GetTaskListSuccess(task));
      }),
      catchError((err, caught) => {
        this.taskStore.dispatch(new TaskActions.GetTaskListFailure(err));
        return throwError(err);
      })
    )
    .subscribe();
  }

  createTask(partialTask: PartialTask): void {
    this.taskStore.dispatch(new TaskActions.CreateTask());

    this.http.post<Task>(this.taskUrl, partialTask)
    .pipe(
      take(1),
      tap((task) => {
        this.taskStore.dispatch(new TaskActions.CreateTaskSuccess(task));
      }),
      catchError((err, caught) => {
        this.taskStore.dispatch(new TaskActions.CreateTaskFailure(err));
        return throwError(err);
      })
    )
    .subscribe();
  }

  updateTask(partialTask: PartialTask): void {
    this.taskStore.pipe(
      select(fromTask.getTaskList),
      take(1),
      mergeMap((tasks) => of<Task>(...tasks)),
      first((task) => task.id === partialTask.id),
      map((task) => Object.assign({}, task, partialTask)),
      tap((task) => {
        this.taskStore.dispatch(new TaskActions.UpdateTask(task));
      }),
      mergeMap((task) => this.http.put(this.taskUrl, task)),
      tap(() => this.taskStore.dispatch(new TaskActions.UpdateTaskSuccess())),
      catchError((err, caught) => {
        this.taskStore.dispatch(new TaskActions.UpdateTaskFailure(err));
        return throwError(err);
      }),
    )
    .subscribe();
  }

  removeTask(id: number): void {
    this.taskStore.dispatch(new TaskActions.RemoveTask(id));

    this.http.delete<null>(`${this.taskUrl}/${id}`)
    .pipe(
      take(1),
      tap(() => {
        this.taskStore.dispatch(new TaskActions.RemoveTaskSuccess());
      }),
      catchError((err, caught) => {
        this.taskStore.dispatch(new TaskActions.RemoveTaskFailure(err));
        return throwError(err);
      })
    )
    .subscribe();
  }
}
