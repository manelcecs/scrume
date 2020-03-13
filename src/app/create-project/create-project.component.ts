import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  // nameFormControl = new FormControl('', [
  //   Validators.required,
  //   ,
  // ]);
  constructor() { }

  ngOnInit(): void {
  }

}
