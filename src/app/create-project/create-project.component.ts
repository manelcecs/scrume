import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, Validator, ValidatorFn, AbstractControl } from '@angular/forms';
import { ProjectService } from '../servicio/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectDto } from '../dominio/project.domain';
import { Observable } from 'rxjs';
import { Team } from '../dominio/team.domain';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  action : string;

  private idProyecto : number;
  private idEquipo : number;
  project: ProjectDto;


  name = new FormControl('', { validators: [Validators.required] });
  desc = new FormControl('', { validators: [Validators.required] });

  constructor(private router: Router, private projectService: ProjectService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {

      if(params.action != undefined){
        if (params.action == "edit") {
          this.action = "edit";

          this.projectService.getProject(params.id).subscribe(res => {
            this.project = res;
            this.name.setValue(this.project.name);
            this.desc.setValue(this.project.description);

            this.idProyecto = params.id;
          });

        } else if (params.action === "create") {
          this.action = "create";

          this.idEquipo = params.id;
        }else{
          console.log("Nice try...");
          this.navigateTo("teams");
        }
      }else{
        console.log("Nice try...");
        this.navigateTo("teams");
      }

    });

  };

  createProject(): void {

    if (this.idProyecto != undefined){

      this._editProject(this.project.id).subscribe((resp: ProjectDto) => {

        this.project = resp;
        this.router.navigate(["project"], {queryParams: {id:this.project.id}});
      });

    }else{
      console.log("proyecto: "+ JSON.stringify(this.project));
      this._createProject().subscribe((resp: ProjectDto) => {

        this.project = resp;
        this.router.navigate(["project"], {queryParams: {id:this.project.id}});

      });

    }

  }

  private _editProject(id: number):Observable<ProjectDto>{
    this.project.name = this.name.value;
    this.project.description = this.desc.value;
    return this.projectService.editProject(id, this.project);

  }

  private _createProject():Observable<ProjectDto>{
    this.project = {description: this.desc.value, name: this.name.value, team: {id: this.idEquipo}};
    return this.projectService.createProject(this.project);

  }

  navigateTo(route: string): void{
    this.router.navigate([route]);
  }

  cancel(): void {
    if (this.action == "create") {
      this.router.navigate(["teams"]);
    } else if (this.action == "edit") {
      this.router.navigate(["project"], {queryParams:{id:this.project.id}});
    }
  }

  validForm():Boolean {

    let valid: boolean;

    valid = this.name.valid && this.desc.valid;
    return valid;

  }

  getErrorMessageName(): String {

    return this.name.hasError('required')?'Este campo es requerido.':'';

  }

  getErrorMessageDesc(): String {
    return this.desc.hasError('required')?'Este campo es requerido.':'';
  }

  }


