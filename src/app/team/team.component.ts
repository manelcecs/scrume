import { Component, OnInit } from '@angular/core';
import { Team } from '../dominio/team.domain';
import { Router } from '@angular/router';
import { TeamService } from '../servicio/team.service';
import { ProjectDto } from '../dominio/project.domain';
import { Board } from '../dominio/board.domain';
import { Sprint, SprintDisplay } from '../dominio/sprint.domain';
import { SprintService } from '../servicio/sprint.service';
import { ProjectService } from '../servicio/project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  options = {
    autoClose: true,
    keepAfterRouteChange: true
};
  teams: Team[];

  constructor(private router: Router,
    private teamService: TeamService,
    private sprintService: SprintService,
    private projectService: ProjectService
    ) { }

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe((teams : Team[] )=>{
      this.teams = teams;
      for(let t of this.teams){
        this.getProjectsOfTeam(t.id).subscribe((projects: ProjectDto[]) =>{
          t.projects = projects;
          console.log("Asignados los proyectos "+projects+" al equipo "+t.name);
        });
      }
    }, (error)=>{
      console.log("Error al hacer la petición a BD. "+error);
      //error("Error al hacer la petición a BD.", this.options);
    });
    }; //añadir subscribe((teams:IPaginationPage<Teams>)=>{this.teams = teams});


  createTeam(): void {
    this.router.navigate(['teamsCreate']);
  }

  editTeam(row: Team): void{
    this.router.navigate(['teamsCreate'], {queryParams: {id: row.id}});
  }

  navigateTo(route: string): void{
    this.router.navigate([route]);
  }

  openProject(proj: ProjectDto): void{
    console.log(JSON.stringify(proj));
    this.router.navigate(['project'], {queryParams: {id: proj.id}});
  }

  createProject(team: Team): void{
    this.router.navigate(['createProject'], {queryParams: {id: team.id, action: "create"}});
  }

  openBoard(proj: ProjectDto): void{
    this.router.navigate(['project'], {queryParams: {id: proj.id}});
  }

  openSprint(proj: ProjectDto): void{
    let idSprint : number;
    this.sprintService.getSprintsOfProject(proj.id).subscribe((sprints: SprintDisplay[])=>{
      idSprint = sprints[sprints.length-1].id;
      this.router.navigate(['sprint'], {queryParams:{id : idSprint}});
    });
  }

  getProjectsOfTeam(id: number): Observable<ProjectDto[]>{
    return this.projectService.getProjects(id);
  }

  deleteTeam(idTeam : number): void {
    this.teamService.deleteTeam(idTeam).subscribe(() => {
      this.teamService.getAllTeams().subscribe((teams : Team[] )=>{
        this.teams = teams;
        for(let t of this.teams){
            this.getProjectsOfTeam(t.id).subscribe((projects: ProjectDto[]) =>{
            t.projects = projects;
          });
        }
      });
    });
  }
}
