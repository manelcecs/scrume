import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../servicio/project.service';
import { ProjectDto, ProjectName } from '../dominio/project.domain';
import { SprintService } from '../servicio/sprint.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SprintDisplay, Sprint, SprintJsonDates } from '../dominio/sprint.domain';
import { FormControl, Validators, Validator, ValidatorFn, AbstractControl } from '@angular/forms';
import { error } from '@angular/compiler/src/util';
import { WrappedNodeExpr } from '@angular/compiler';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css', './new-sprint-dialog.css']
})
export class ProjectComponent implements OnInit {
  project : ProjectDto;
  sprints : SprintDisplay[];
  startDate: Date;
  endDate: Date;

  idProject : number;

  constructor(private activatedRoute: ActivatedRoute,
     private router: Router,
     private projectService: ProjectService,
     private sprintService : SprintService,
     public dialog: MatDialog
    ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params =>{

      console.log(JSON.stringify(params));
      if(params.id != undefined){
        this.idProject = params.id;

        this.projectService.getProject(this.idProject).subscribe((project:ProjectDto)=>{
          this.project = project;
          console.log(JSON.stringify(this.project));
          this.sprintService.getSprintsOfProject(this.project.id).subscribe((sprint:SprintDisplay[])=>{
            this.sprints = sprint;
          });

        });
      }else{
        console.log("Nice try...");
        //this.navigateTo("teams");
      }
    });
  }

  openBacklog(): void{
    console.log("openBacklog" + this.project.id);
    this.router.navigate(['backlog'], {queryParams: {id: this.project.id}});
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(NewSprintDialog, {
      width: '250px',
      data: {project:{id:this.project.id, name:this.project.name},startDate: this.startDate, endDate: this.endDate}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.sprintService.getSprintsOfProject(this.project.id).subscribe((sprint:SprintDisplay[])=>{
        this.sprints = sprint;
      });
    });
  }


  navigateTo(route: String): void{
    this.router.navigate([route]);
  }

  navigateToSprint(sprint : Sprint) : void {
    this.router.navigate(["sprint"], {queryParams: {id : sprint.id}});
  }

  editProject(project : ProjectDto){
    this.router.navigate(['createProject'], {queryParams: {id: project.id, action:"edit"}});
  }

  deleteProject(idProject : number) {
    this.projectService.deleteProject(idProject).subscribe((project : ProjectDto) => {
      this.navigateTo("teams");
    });
  }
}


// DIALOGO PARA CREAR UN SPRINT

@Component({
  selector: 'new-sprint-dialog',
  templateUrl: 'new-sprint-dialog.html',
  styleUrls: ['./new-sprint-dialog.css']
})
export class NewSprintDialog implements OnInit{

  project: ProjectName;
  sprint: SprintJsonDates;
  startDate = new FormControl('',  { validators: [Validators.required, this.validateToday, this.validateStartBeforeEnd]});
  endDate = new FormControl('',  { validators: [Validators.required, this.validateToday] });

  constructor(
    public dialogRef: MatDialogRef<NewSprintDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Sprint,
    private sprintService: SprintService, private router: Router) {}


  ngOnInit(): void {
    this.project = this.data.project;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick() : void {
    this.sprint = {id:0, startDate: new Date(this.startDate.value).toISOString(), endDate: new Date(this.endDate.value).toISOString(), project:{id:this.project.id, name:this.project.name}}
    console.log(this.sprint);

    this.sprintService.createSprint(this.sprint).subscribe((sprint : Sprint) => {
      this.dialogRef.close();
      //FIXME: Recargar la pagina
      this.router.navigate(["project"], {queryParams:{id:this.project.id}})
    });

  }

  getErrorMessageStartDate() : string {
    return this.startDate.hasError('required')?'Este campo es obligatorio':this.startDate.hasError('past')?'La fecha no puede ser en pasado':this.startDate.hasError('invalid')?'La fecha de fin no puede ser anterior a la de inicio':'';
  };

  getErrorMessageEndDate() : string {
    return this.startDate.hasError('required')?'Este campo es obligatorio':this.startDate.hasError('past')?'La fecha no puede ser en pasado':'';
  }

  validForm():boolean {

    let valid: boolean;

    valid = this.endDate.valid && this.startDate.valid;
    return valid;

  }

  validateToday(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      console.log("Prueba 2")
      let isValid = true;

      if (control.value.getTime() < Date.now()) {
        isValid = false;
      }
      return isValid ? null : { 'past': 'the date cant be past' }
    };
  }

  validateStartBeforeEnd(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let isValid = true;
      if (control.value.getTime() > this.endDate.value.getTime()) {
        isValid = false;
      }
      return isValid ? null : { 'invalid': 'Invalid dates' }

    };
  }

    //Validartor que compruebe si puede crear un sprnt en esas fechas con una query
  // validateStartBeforeEnd(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //     let isValid = true;
  //     if (control.value.getTime() > this.endDate.value.getTime()) {
  //       isValid = false;
  //     }
  //     return isValid ? null : { 'invalid': 'Invalid dates' }

  //   };
  // }

}
