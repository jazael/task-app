import { Task } from './../models/task.model';
import { Proyecto } from './../models/proyecto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = '/assets/jsons/proyectos.json';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.url);
  }

  getTasks(): Task[] {
    console.log(this.getProjects());

    if (localStorage.getItem('tasks') === null) {
      return [];
    }

    return JSON.parse(localStorage.getItem('tasks'));
  }

}
