import { Component, OnInit } from '@angular/core';
import { Team } from '../dominio/team.domain';
import { Router } from '@angular/router';
import { TeamService } from '../servicio/team.service';
import { ProjectDto } from '../dominio/project.domain';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: Team [];

  constructor(private router: Router, private teamService: TeamService) { }

  ngOnInit(): void {
    sessionStorage.setItem("user", "Jonh Doe");
    sessionStorage.setItem("pass", "constrasenya");
    this.teams = this.teamService.getAllTeams(); //añadir subscribe((teams:IPaginationPage<Teams>)=>{this.teams = teams});
  }

  createTeam(): void {
    this.router.navigate(['teamsCreate']);
  }

  editTeam(row: Team): void{
    this.router.navigate(['teamsCreate'], {queryParams: {id: row.id}});
  }

  navigateTo(route: String): void{
    this.router.navigate([route]);
  }

  openProject(proj: ProjectDto): void{
    this.router.navigate(['project'], {queryParams: {id: proj.id}});
  }

  createProject(team: Team): void{
    this.router.navigate(['project/create'], {queryParams: {id: team.id}});
  }

}
