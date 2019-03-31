import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { PartialTask } from '../../models/partial-task';

@Component({
  selector: 'app-task-creator',
  templateUrl: './task-creator.component.html',
  styleUrls: ['./task-creator.component.scss']
})
export class TaskCreatorComponent implements OnInit {

  inputValue = '';

  @Output()
  description: EventEmitter<PartialTask> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  setDescription(description: string) {
    if (description.trim().length) {
      this.description.emit({
        id: null,
        description: description.trim(),
      });
    }
    this.inputValue = '';
  }

}
