import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CabeceraService } from './cabecera.service';
import { Team } from '../dominio/team.domain';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})

export class TeamService {

    constructor(private httpClient:HttpClient, private cabeceraService:CabeceraService){}

    getAllTeams() : Observable<Team[]> {
        return this.httpClient.get<Team[]>(this.cabeceraService.getCabecera() + "api/team/list?idUser=311", {headers: this.cabeceraService.getBasicAuthentication()});

    }


    createTeam(team: Team): Observable<Team> {
        return this.httpClient.post<Team>(this.cabeceraService.getCabecera() + "api/team/save", team, {headers: this.cabeceraService.getBasicAuthentication()});
    }

    getTeam(id: number):any{
        // return this.httpClient.get<Team>(this.cabeceraService.getCabecera() + "/team?id=" + id);

    }

    editTeam(id: number, team: Team): Observable<Team> {
        //FIXME: a cambiar post por put
        return this.httpClient.post<Team>(this.cabeceraService.getCabecera() + "api/team/update?idTeam=" + id, team, {headers: this.cabeceraService.getBasicAuthentication()});
    }

    getTeamByProjectID(idProject: number): any {
        //return this.httpClient.get<Team>(this.this.cabeceraService.getCabecera() + "/team?idProject=" + idProject);
        return this.getTeam(1);
    }

    deleteTeam(id: number): Observable<Team> {
        return this.httpClient.delete<Team>(this.cabeceraService.getCabecera() + "api/team/delete?idTeam=" + id, {headers: this.cabeceraService.getBasicAuthentication()});
    }

}

