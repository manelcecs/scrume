import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CabeceraService } from './cabecera.service';
import { ProjectDto, ProjectComplete } from '../dominio/project.domain';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})

export class ProjectService {

    constructor(private httpClient:HttpClient, private cabeceraService:CabeceraService){}

    getProject(idProject : number) : Observable<ProjectDto>{
        return this.httpClient.get<ProjectDto>(this.cabeceraService.getCabecera() + "api/project/get?id=" + idProject, {headers: this.cabeceraService.getBasicAuthentication()});
    }

    createProject(project: ProjectDto) : Observable<ProjectDto> {
        return this.httpClient.post<ProjectDto>(this.cabeceraService.getCabecera() + "api/project/save", project, {headers: this.cabeceraService.getBasicAuthentication()});
    }

    editProject(id: number, project : ProjectDto) : Observable<ProjectDto> {
        return this.httpClient.put<ProjectDto>(this.cabeceraService.getCabecera() + "api/project/update?id=" + id, project, {headers: this.cabeceraService.getBasicAuthentication()});
    }

    deleteProject(id: number): Observable<ProjectDto> {
        return this.httpClient.delete<ProjectDto>(this.cabeceraService.getCabecera() + "api/project/delete?id=" + id, {headers: this.cabeceraService.getBasicAuthentication()});
    }

    getProjects(id: number): Observable<ProjectDto[]>{
        return this.httpClient.get<ProjectDto[]>(this.cabeceraService.getCabecera() + "api/project/list?id="+id, {headers: this.cabeceraService.getBasicAuthentication()});
    }

    getProjectWithTasks(idProject : number): Observable<ProjectComplete>{
      return this.httpClient.get<ProjectComplete>(this.cabeceraService.getCabecera() + "api/task/list-by-project?idProject=" + idProject, {headers: this.cabeceraService.getBasicAuthentication()});
  }
}

