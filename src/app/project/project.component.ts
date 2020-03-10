import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  team : string = "Olimpia"
  project : string = "Acme-Madrugá"
  desc : string = "Proyecto para la asignatura de Diseño y Pruebas 2. El objetivo es que los usuarios (hermandades de semana santa) puedan organizar sus cofradías y los hermanos puedan apuntarse. El A+ para este proyecto es la inclusión de un sistema de gráficos en el dashboard.";
  

  constructor() { }

  ngOnInit(): void {
  }

}
