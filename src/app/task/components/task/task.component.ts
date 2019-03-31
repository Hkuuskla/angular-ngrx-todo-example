import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { Task } from './../../models/task';
import { PartialTask } from './../../models/partial-task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Output()
  done: EventEmitter<PartialTask> = new EventEmitter();

  @Output()
  description: EventEmitter<PartialTask> = new EventEmitter();

  @Output()
  datetime: EventEmitter<PartialTask> = new EventEmitter();

  @Output()
  remove: EventEmitter<number> = new EventEmitter();

  @Input()
  task: Task;

  constructor() { }

  ngOnInit() {
  }

  setDone(done: boolean) {
    this.done.emit({
      id: this.task.id,
      done,
    });
  }

  setDescription(description: string) {
    this.description.emit({
      id: this.task.id,
      description,
    });
  }

  getDatetime() {
    if (this.task.date && this.task.time) {
      return moment(`${this.task.date} ${this.task.time}`, 'YYYY-MM-DD HH:mm:ss').format();
    }
  }

  setDatetime(datetime) {
    this.datetime.emit({
      id: this.task.id,
      date: moment(datetime).format('YYYY-MM-DD'),
      time: moment(datetime).format('HH:mm:ss'),
    });
  }

  removeTask() {
    this.remove.emit(this.task.id);
  }

}
