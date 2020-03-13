import { Component, OnInit } from '@angular/core';
import { Team } from '../dominio/team.domain';
import { Router } from '@angular/router';
import { TeamService } from '../servicio/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: Team [];

  constructor(private router: Router, private teamService: TeamService) { }

  ngOnInit(): void {
    this.teams = this.teamService.getAllTeams(); //añadir subscribe((teams:IPaginationPage<Teams>)=>{this.teams = teams});
  }

  createTeam(): void {
    this.router.navigate(['teamsCreate']);
  }

  editTeam(row: Team): void{
    this.router.navigate(['teamsCreate'], {queryParams: {id: row.id}});
  }

/*  deleteTeam(row: Team): void{
    this.router.navigate(['teamsCreate'], {queryParams: {id: row.id}});
  }*/

}
