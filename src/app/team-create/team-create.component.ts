import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamService } from '../servicio/team.service';
import { Team } from '../dominio/team.domain';
import { FormControl, Validators } from '@angular/forms';
import { ProjectDto } from '../dominio/project.domain';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {

  constructor(private router: Router, private teamService: TeamService, private activatedRoute: ActivatedRoute) {}

  private id: number;
  team: Team;

  name: FormControl = new FormControl('',{validators: [Validators.required, Validators.maxLength(15)]});

  private projects: ProjectDto[];

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {

      if (params.id != undefined){
        this.id = params.id;

        this.team = this.teamService.getTeam(1);
        this.name.setValue(this.team.name);

        this.projects = this.team.projects;

      }

    });

  }

  validForm():Boolean {

    let valid: Boolean = true;
    
    valid = valid && this.name.valid;
    return valid;

  }

  createTeam(): void {

    this.team = {name: this.name.value, projects: []};

    if (this.id != undefined){

      this._editTeam(this.id).subscribe((resp: Team) => {

        this.team = resp;

      });

    }else{

      this._createTeam().subscribe((resp: Team) => {

        this.team = resp;

      });

    }

  }

  private _editTeam(id: number):any/*Observable<Team>*/{
    
    this.team.projects = this.projects;
    return this.teamService.editTeam(id, this.team);

  }

  private _createTeam():any/*Observable<Team>*/{
    
    this.team.projects = this.projects;
    return this.teamService.createTeam(this.team);

  }

  //private _deleteTeam(id: number):any/*Observable<Team>*/{
    
  //  this.team.projects = this.projects;
  //  return this.teamService.deleteTeam(id, this.team);

  //}

  cancelCreateteam(): void {

    this.router.navigate(['teams']);

  }

  getErrorMessageName(): String {

    return this.name.hasError('required')?'Este campo es requerido.':this.name.hasError('maxlength')?'Este campo no permite más de 15 caracteres.':'';

  }

}
