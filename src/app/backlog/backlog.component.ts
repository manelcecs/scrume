import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Team, TeamSimple } from '../dominio/team.domain';
import { ProjectDto, ProjectComplete, ProjectName } from '../dominio/project.domain';
import { ProjectService } from '../servicio/project.service';
import { TeamService } from '../servicio/team.service';
import { NewSprintDialog } from '../project/project.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDto, TaskSimple } from '../dominio/task.domain';
import { FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { TaskService } from '../servicio/task.service';
import { isNumber } from 'util';


@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  idProject: number;
  project: ProjectComplete;
  searchValue;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private projectService: ProjectService, private teamService: TeamService,private dialog: MatDialog, private taskService: TaskService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(param => {

      if(param.id != undefined){
        this.idProject = param.id;
      
        this.projectService.getProjectWithTasks(this.idProject).subscribe((project:ProjectComplete)=>{
          this.project = project;
          this.projectService.getProject(this.idProject).subscribe((project:ProjectDto)=>{
            this.project.team = {id: project.team.id, name: project.team.name};
            console.log("Proyecto " + this.project);
          });
        });

      } else{
        this.navigateTo("bienvenida");
      }

    });
  }

  navigateTo(route: String): void{
    this.router.navigate([route]);
  }

  openProject(proj: ProjectComplete): void{
    this.router.navigate(['project'], {queryParams: {id: proj.id}});
  }

  openTeam(team: TeamSimple): void{
    this.router.navigate(['team'], {queryParams: {id: team.id}});
  }

  deleteTask(task: TaskSimple): void{
    this.taskService.deleteTask(task.id).subscribe(()=>{
      this.projectService.getProjectWithTasks(this.idProject).subscribe((project:ProjectComplete)=>{
        this.project.tasks = project.tasks;
      });
    });
  }

  openCreateTask(): void {
    const dialogRef = this.dialog.open(NewTaskDialog, {
      width: '250px',
      data: {project:this.project.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.projectService.getProjectWithTasks(this.idProject).subscribe((project:ProjectComplete)=>{
        this.project = project;
      });
      console.log('The dialog was closed');
    });
  }

  openEditTask(task: TaskDto): void {
    const dialogRef = this.dialog.open(EditTaskDialog, {
      width: '250px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      this.projectService.getProjectWithTasks(this.idProject).subscribe((project:ProjectComplete)=>{
        this.project = project;
      });
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'new-task-dialog',
  templateUrl: 'new-task-dialog.html',
  styleUrls: ['./new-task-dialog.css']
})
export class NewTaskDialog implements OnInit{

  projectComplete: ProjectName;
  project: number;
  task: TaskDto;
  title = new FormControl('',  { validators: [Validators.required]});
  description = new FormControl('',  { validators: []});
  estimate = new FormControl('',  { validators: [Validators.pattern('^([1-9]){1}$|([0-9]{2,})$')]});

  constructor(
    public dialogRef: MatDialogRef<NewTaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDto,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
     this.dialogRef.close();
  }

  onSaveClick() : void {
    this.task = {id:0, title:this.title.value, description:this.description.value, estimate:this.estimate.value, project:this.projectComplete};
    this.taskService.createTask(this.task).subscribe(()=>{
      this.dialogRef.close();
    });
  }

  getErrorMessageTitle() : String {
    return this.title.hasError('required')?'Este campo es obligatorio':'';
  };

  getErrorMessageDescription() : String {
    return this.description.hasError('required')?'Este campo es obligatorio':'';
  };

  getErrorMessageEstimate() : String {
    return this.estimate.hasError('pattern')?'Debe ser un número mayor que 0':'';
  };

  validForm():boolean {
    let valid: boolean;
    valid = this.estimate.valid && this.title.valid && this.description.valid;
    return valid;
  }
}

@Component({
  selector: 'edit-task-dialog',
  templateUrl: 'edit-task-dialog.html',
  styleUrls: ['./edit-task-dialog.css']
})
export class EditTaskDialog implements OnInit{
  project: ProjectComplete;
  idTask: number;
  task: TaskSimple;
  title = new FormControl('',  { validators: [Validators.required]});
  description = new FormControl('',  { validators: []});
  estimate = new FormControl('',  { validators: [Validators.pattern('^([1-9]){1}$|([0-9]{2,})$')]});

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDto,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.idTask = this.data.id;
    this.title.setValue(this.data.title);
    this.description.setValue(this.data.description);
    this.estimate.setValue(this.data.estimate);
  }

  onNoClick(): void {
     this.dialogRef.close();
  }

  onSaveClick() : void {
    this.task = {id:this.idTask, title:this.title.value, description:this.description.value, estimate:this.estimate.value};
    this.taskService.editTask(this.idTask, this.task).subscribe(()=>{
      this.dialogRef.close();
    });
  }

  getErrorMessageTitle() : String {
    return this.title.hasError('required')?'Este campo es obligatorio':'';
  };

  getErrorMessageDescription() : String {
    return this.description.hasError('required')?'Este campo es obligatorio':'';
  };

  getErrorMessageEstimate() : String {
    return this.estimate.hasError('pattern')?'Debe ser un número mayor que 0':'';
  };

  validForm():boolean {
    let valid: boolean;
    valid = this.estimate.valid && this.title.valid && this.description.valid;
    return valid;
  }
}
