import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CabeceraService } from './cabecera.service';
import { Observable } from 'rxjs';
import { SprintDisplay, Sprint } from '../dominio/sprint.domain';
import { TaskSimple } from '../dominio/task.domain';

@Injectable({providedIn:'root'})

export class TaskService {

    constructor(private httpClient:HttpClient, private cabeceraService:CabeceraService){}

    createTask(task : TaskSimple): Observable<TaskSimple>{
      return this.httpClient.post<TaskSimple>(this.cabeceraService.getCabecera() + "api/task/save", task, {headers: this.cabeceraService.getBasicAuthentication()});
    }

    editTask(id: number, task : TaskSimple): Observable<TaskSimple>{
     return this.httpClient.put<TaskSimple>(this.cabeceraService.getCabecera() + "api/task/update?id=" + id, task, {headers: this.cabeceraService.getBasicAuthentication()});
    }

    deleteTask(id: number): Observable<TaskSimple>{
     return this.httpClient.delete<TaskSimple>(this.cabeceraService.getCabecera() + "api/task/delete?id=" + id, {headers: this.cabeceraService.getBasicAuthentication()});
    }

}
