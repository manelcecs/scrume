import { Component, OnInit, Inject } from '@angular/core';
import { Sprint, SprintDisplay, SprintJsonDates } from '../dominio/sprint.domain';
import { FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NewSprintDialog } from '../project/project.component';
import { SprintService } from '../servicio/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  sprint : SprintDisplay;
  idSprint : number;

  constructor(private sprintService : SprintService, private activatedRoute: ActivatedRoute, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(param => {

      if(param.id != undefined){
        this.idSprint = param.id;

        this.sprintService.getSprint(this.idSprint).subscribe((sprintDisplay : SprintDisplay)=> {
          this.sprint = sprintDisplay;
        });

      } else{
        this.navigateTo("bienvenida");
      }
    }
    )}

  navigateTo(route: String): void{
    this.router.navigate([route]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditSprintDialog, {
      width: '250px',
      data: this.sprint
    });
    dialogRef.afterClosed().subscribe(() => {
      this.sprintService.getSprint(this.idSprint).subscribe((sprintDisplay : SprintDisplay)=> {
        this.sprint = sprintDisplay;
      });
    });
  }

  openProject(proj: number): void{
    this.router.navigate(['project'], {queryParams: {id: proj}});
  }

  openTeam(team: number): void{
    this.router.navigate(['team'], {queryParams: {id: team}});
  }


}


@Component({
  selector: 'edit-sprint-dialog',
  templateUrl: 'edit-sprint-dialog.html',
  styleUrls: ['./edit-sprint-dialog.css']
})
export class EditSprintDialog implements OnInit{

  idSprint: number;
  sprint : SprintJsonDates;
  //FIXME: Arreglar los validators
  startDate = new FormControl('',  { validators: [Validators.required, this.validateToday]});
  endDate = new FormControl('',  { validators: [Validators.required, this.validateToday, this.validateStartBeforeEnd] });

  constructor(
    public dialogRef: MatDialogRef<EditSprintDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SprintDisplay,
    private sprintService: SprintService) {}


  ngOnInit(): void {
    this.idSprint = this.data.id;
    this.startDate.setValue(new Date(this.data.startDate));
    this.endDate.setValue(new Date(this.data.endDate));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick() : void {
    this.sprint = {id:this.idSprint, startDate: new Date(this.startDate.value).toISOString(), endDate: new Date(this.endDate.value).toISOString()}
    this.sprintService.editSprint(this.idSprint, this.sprint).subscribe((sprint : Sprint) => {
      console.log(sprint);
      //FIXME: Recargar la pagina
      this.dialogRef.close();
    });

  }

  getErrorMessageStartDate() : String {
    return this.startDate.hasError('required')?'Este campo es obligatorio':this.startDate.hasError('past')?'La fecha no puede ser en pasado':this.startDate.hasError('invalid')?'La fecha de fin no puede ser anterior a la de inicio':'';
  };

  getErrorMessageEndDate() : String {
    return this.startDate.hasError('required')?'Este campo es obligatorio':this.startDate.hasError('past')?'La fecha no puede ser en pasado':'';
  }

  validForm():boolean {
    let valid: boolean;
    valid = this.endDate.valid && this.startDate.valid;
    return valid;
  }

  validateToday(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      let isValid = true;

      if (control.value.getTime() < new Date(Date.now()).getTime()) {
        isValid = false;
      }
      return isValid ? null : { 'past': 'the date cant be past' };
    };
  }

  validateStartBeforeEnd(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let isValid = true;
      if (control.value.getTime() > this.endDate.value.getTime()) {
        isValid = false;
      }
      return isValid ? null : { 'invalid': 'Invalid dates' };

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
