import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CabeceraService } from './cabecera.service';
import { Team } from '../dominio/team.domain';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})

export class TeamService {

    constructor(private httpClient:HttpClient, private cabeceraService:CabeceraService){}

    getAllTeams()/*:Observable<Team>*/{
        // return this.httpClient.get<Team>(this.cabeceraService.getCabecera() + "/team");
        let team1: Team = {
            id: 1,
            name: "Olimpia",
            projects: [{
                id: 2,
                name: "Dpppppppppppppp"
            },{
                id: 3,
                name: "Dp2"
            }],
        };
        let team2: Team = {
            id: 4,
            name: "Scrume",
            projects: [{
                id: 5,
                name: "Dp3"
            },{
                id: 6,
                name: "Dp4"
            }],
        };
        let team3: Team = {
            id: 7,
            name: "Gamus",
            projects: [{
                id: 8,
                name: "Dp5"
            },{
                id: 9,
                name: "Dp6"
            },{
                id: 10,
                name: "ispp"
            }],
        };
        let teams:Team[]=[];
        teams.push(team1);
        teams.push(team2);
        teams.push(team3);
        return teams;

    }


    createTeam(team: Team):any {
        // return this.httpClient.post<Team>(this.cabeceraService.getCabecera() + "/team", team);
        let team1: Team;
        team1 = {id: 1, name: team.name, projects: []};

        let response = new Observable(obs => {

            setTimeout(() => {

                obs.next(team1);

            }, 1000);

        });

        return response;
    }

    getTeam(id: number):Team{
        // return this.httpClient.get<Team>(this.cabeceraService.getCabecera() + "/team?id=" + id);
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
        return team1;
    }

    editTeam(id: number, team: Team):any {
        // return this.httpClient.post<Team>(this.cabeceraService.getCabecera() + "/team?id=" + id, team);
        let response = new Observable(obs => {

            setTimeout(() => {

                obs.next(team);

            }, 1000);

        });
        return response;
      }

      /*deleteTeam(id: number, team: Team):any {
        // return this.httpClient.post<Team>(this.cabeceraService.getCabecera() + "/team?id=" + id, team);
        let response = new Observable(obs => {

            setTimeout(() => {

                obs.next(team);

            }, 1000);

        });
        return response;
      }*/

}

