import { Project } from './../../models/project.model';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  projects: Project[] = [];
  taskForm: FormGroup;
  task: Task;
  projectsFilteredList: Project[];
  id: number;
  private sub: any;

  constructor(private taskService: TaskService, private _fb: FormBuilder, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.task = new Task();
    this.taskService.getProjects()
      .subscribe(
        response => this.projects = response
      );

      this.id = +this.route.snapshot.paramMap.get('id');
      let task: any;
      if (this.id != null) {
        task = this.taskService.getTaskByIndex(this.id);
        this.task.project = { id: task.project.id, descripcion: task.project.descripcion };        ;
        this.task.nombretarea = task.nombretarea;
        this.task.tiempo = task.tiempo;
      }

      this.taskForm = this._fb.group({
        project: [this.task.project ? this.task.project.id : '', [Validators.required]],
        nombretarea: [this.task ? this.task.nombretarea : '', [Validators.required, Validators.maxLength(50)]],
        tiempo: [this.task ? this.task.tiempo : '', [Validators.required, this.tiempoNoValido]]
      });
  }

  tiempoNoValido(control: FormControl): { [s: string]: boolean } {
    if (control.value === '') { return null; }
      if (control.value < 0.5 || control.value > 8) {
        return {
          tiemponovalido: true
        };
      }

    return null;
  }

  save() {
    this.projectsFiltered = this.projects.filter((project: Project) => project.id === Number(this.taskForm.value.project));
    this.task.project = { id: this.projectsFiltered[0].id, descripcion: this.projectsFiltered[0].descripcion };
    this.task.nombretarea = this.taskForm.value.nombretarea;
    this.task.tiempo = this.taskForm.value.tiempo;
    this.task.hide = this.taskForm.value.hide;
    this.taskService.saveTask(this.task);
  }

}
