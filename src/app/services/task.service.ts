import { Task } from './../models/task.model';
import { Project } from '../models/project.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = '/assets/jsons/proyectos.json';

  tasks: Task[] = [];

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  getTasks() {
    if (localStorage.getItem('tasks') === null) {
      this.tasks = [];
    } else {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    return this.tasks;
  }

  saveTask(task: Task) {
    this.tasks.push(task);
    let tasks = [];
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  getTaskByIndex(index: number): Task {
    // const tasks = JSON.parse(localStorage.getItem('tasks'));
    return this.tasks[index];
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

}
