import { Action } from '@ngrx/store';
import { Task } from '../models/task';

export enum TaskActionTypes {
  GetTaskList = '[Task] Get task list',
  GetTaskListSuccess = '[Task] Get task list success',
  GetTaskListFailure = '[Task] Get task list failure',
  CreateTask = '[Task] Create task',
  CreateTaskSuccess = '[Task] Create task success',
  CreateTaskFailure = '[Task] Create task failure',
  UpdateTask = '[Task] Update task',
  UpdateTaskSuccess = '[Task] Update task success',
  UpdateTaskFailure = '[Task] Update task failure',
  RemoveTask = '[Task] Remove task',
  RemoveTaskSuccess = '[Task] Remove task success',
  RemoveTaskFailure = '[Task] Remove task failure',
}

export class GetTaskList implements Action {
  readonly type = TaskActionTypes.GetTaskList;
}

export class GetTaskListSuccess implements Action {
  readonly type = TaskActionTypes.GetTaskListSuccess;

  constructor(public payload: Task[]) { }
}

export class GetTaskListFailure implements Action {
  readonly type = TaskActionTypes.GetTaskList;

  constructor(public payload: any) { }
}

export class CreateTask implements Action {
  readonly type = TaskActionTypes.CreateTask;
}

export class CreateTaskSuccess implements Action {
  readonly type = TaskActionTypes.CreateTaskSuccess;

  constructor(public payload: Task) { }
}

export class CreateTaskFailure implements Action {
  readonly type = TaskActionTypes.CreateTask;

  constructor(public payload: any) { }
}

export class UpdateTask implements Action {
  readonly type = TaskActionTypes.UpdateTask;

  constructor(public payload: Task) { }
}

export class UpdateTaskSuccess implements Action {
  readonly type = TaskActionTypes.UpdateTaskSuccess;
}

export class UpdateTaskFailure implements Action {
  readonly type = TaskActionTypes.UpdateTask;

  constructor(public payload: any) { }
}

export class RemoveTask implements Action {
  readonly type = TaskActionTypes.RemoveTask;

  constructor(public payload: number) { }
}

export class RemoveTaskSuccess implements Action {
  readonly type = TaskActionTypes.RemoveTaskSuccess;
}

export class RemoveTaskFailure implements Action {
  readonly type = TaskActionTypes.RemoveTask;

  constructor(public payload: any) { }
}

export type TaskActions =
  | GetTaskList
  | GetTaskListSuccess
  | GetTaskListFailure
  | CreateTask
  | CreateTaskSuccess
  | CreateTaskFailure
  | UpdateTask
  | UpdateTaskSuccess
  | UpdateTaskFailure
  | RemoveTask
  | RemoveTaskSuccess
  | RemoveTaskFailure;
