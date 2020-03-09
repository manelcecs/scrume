import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  private idioma : string = "es";
  constructor(private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem("idioma", this.idioma);

  }

  navigateTo(route: String): void{
    this.router.navigate([route]);
  }

}
