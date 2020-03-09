import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.css']
})
export class WellcomeComponent implements OnInit {

  private idioma: string = "en";

  constructor() { }

  ngOnInit(): void {
        localStorage.setItem("idioma", this.idioma);
  }

}
