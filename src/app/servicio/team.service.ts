import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CabeceraService } from './cabecera.service';
import { Team } from '../dominio/team.domain';

@Injectable({providedIn:'root'})

export class TeamService {

    constructor(private httpClient:HttpClient, private cabeceraService:CabeceraService){}

    getAllTeams(){
        // return this.httpClient.get<Team>(this.cabeceraService.getCabecera() + "/team");
        let team1: Team = {
            id: 1,
            name: "Olimpia",
            projects: [{
                id: 2,
                name: "Dp"
            },{
                id: 3,
                name: "Dp2"
            }],
        };
        let team2: Team = {
            id: 4,
            name: "Gamus",
            projects: [{
                id: 5,
                name: "Dp3"
            },{
                id: 6,
                name: "Dp4"
            }],
        };
        let teams:Team[]=[];
        teams.push(team1);
        teams.push(team2);
        return teams;

    }

}

