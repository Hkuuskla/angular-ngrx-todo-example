import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

import { TaskActionTypes, TaskActions } from './../actions/task.actions';
import { Task } from '../models/task';


export interface State {
  taskList: Task[];
}

export const initialState: State = {
  taskList: []
};

export function reducer(state = initialState, action: TaskActions): State {
  switch (action.type) {

    case TaskActionTypes.GetTaskListSuccess: {
      return {
        ...state,
        taskList: action.payload,
      };
    }

    case TaskActionTypes.CreateTaskSuccess: {
      const createdTask: Task = action.payload;

      return {
        ...state,
        taskList: [
          createdTask,
          ...state.taskList,
        ]
      };
    }

    case TaskActionTypes.UpdateTask: {
      const updatedTask: Task = action.payload;
      const taskIndex = state.taskList.findIndex((task) => task.id === updatedTask.id);

      return {
        ...state,
        taskList: state.taskList.map((task) => (task.id === updatedTask.id) ? updatedTask : task),
      };
    }

    case TaskActionTypes.RemoveTask: {
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.payload),
      };
    }

    default:
      return state;
  }
}

export const selectTaskState = createFeatureSelector<State>('task');

export const getTaskList = createSelector(
  selectTaskState,
  (state: State) => state.taskList
);
