import { TaskService } from './../../services/task.service';
import { Task } from './../../models/task.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(index: number) {
    if (confirm('Esta seguro que desea eliminar la tarea ?')) {
      this.taskService.deleteTask(index);
    }
  }

}
