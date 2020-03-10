import { Component, OnDestroy, ChangeDetectorRef, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  routes: Object[] = [];
  idioma: string  = "es";

  constructor(private router: Router) {

  }

  ngOnInit(): void{
    this.cargarMenu();

    Promise.resolve().then(()=> {
      let idm = localStorage.getItem("idioma");
      if (idm == null){
        localStorage.setItem("idioma", this.idioma);
      }else{
        this.idioma = idm;
      }

      if(this.idioma == "es"){
        this.router.navigate(["bienvenida"]);
      }else{
        this.router.navigate(["wellcome"]);
      }

    });
  }

  ngOnDestroy(): void {
    
  }

  navigateTo(route: String): void{
    this.router.navigate([route]);
  }

  cargarMenu() : void{
    console.log("Menu cargado");
    this.routes = [
      {
        title: 'Bienvenida',
        route: '/bienvenida',
        icon: 'home',
        visible: 'true'
    },{
        title: 'Wellcome',
        route: '/wellcome',
        icon: 'home',
        visible: 'true'
    },{
        title: 'Equipo',
        route: '/teams',
        icon: 'people',
        visible: 'true'
    }
  ];
  } 

}
