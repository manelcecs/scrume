import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CabeceraService } from './cabecera.service';
import { Observable } from 'rxjs';
import { SprintDisplay, Sprint, SprintJsonDates } from '../dominio/sprint.domain';

@Injectable({providedIn:'root'})

export class SprintService {

    constructor(private httpClient:HttpClient, private cabeceraService:CabeceraService){}

    getSprintsOfProject(idProject : number): Observable<SprintDisplay[]>{
      return this.httpClient.get<SprintDisplay[]>(this.cabeceraService.getCabecera() + "api/sprint/list?idProject=" + idProject, {headers: this.cabeceraService.getBasicAuthentication()});
    }

    getSprint(idSprint : number): Observable<SprintDisplay>{
      return this.httpClient.get<SprintDisplay>(this.cabeceraService.getCabecera() + "api/sprint/statistics?idSprint=" + idSprint, {headers: this.cabeceraService.getBasicAuthentication()});
    }

    createSprint(sprint : SprintJsonDates) : Observable<Sprint>{
      return this.httpClient.post<Sprint>(this.cabeceraService.getCabecera() + "api/sprint/save", sprint, {headers: this.cabeceraService.getBasicAuthentication()});

    }

    editSprint(id: number, sprint : SprintJsonDates) : Observable<Sprint> {
      return this.httpClient.post<Sprint>(this.cabeceraService.getCabecera() + "api/sprint/update?idSprint=" + id, sprint, {headers: this.cabeceraService.getBasicAuthentication()});
    }

    deleteSprint(id: number):any {
      // return this.httpClient.post<Sprint>(this.cabeceraService.getCabecera() + "/sprint?id=" + id, sprint);
    }



}

