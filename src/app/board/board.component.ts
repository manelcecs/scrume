import { Component, OnInit } from '@angular/core';
import { ColumDto} from '../dominio/colum.domian';
import { Router } from '@angular/router';
import { BoardService } from '../servicio/board.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskDto } from '../dominio/task.domain';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  colums: ColumDto [];

  constructor(private router: Router, private boardService: BoardService) { }

  ngOnInit(): void {
    sessionStorage.setItem("user", "Jonh Doe");
    sessionStorage.setItem("pass", "constrasenya");
    this.colums = this.boardService.getTaskForColums(); //añadir subscribe((colums:Colums)=>{this.colums = colums});
  }

  var: string = "To Do";

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {

      let col = new String(event.container.data);

      if (col == "To Do") {
        this.moveInArray(this.colums[0] , event.previousIndex , event.currentIndex);
      } else if (col == "Done"){
        this.moveInArray(this.colums[2] , event.previousIndex , event.currentIndex);
      } else {
        this.moveInArray(this.colums[1] , event.previousIndex , event.currentIndex);
      }
      
    } else {

      let col = new String(event.previousContainer.data);
      let col2 = new String(event.container.data);

      if (col == "To Do" && col2 == "In Progress") {
        this.transferTaskToArray(this.colums[0].tareas, this.colums[1].tareas, event.previousIndex, event.currentIndex);
      } else if (col == "To Do" && col2 == "Done"){
        this.transferTaskToArray(this.colums[0].tareas, this.colums[2].tareas, event.previousIndex, event.currentIndex);
      } else if (col == "In Progress" && col2 == "To Do"){
        this.transferTaskToArray(this.colums[1].tareas, this.colums[0].tareas, event.previousIndex, event.currentIndex);
      } else if (col == "In Progress" && col2 == "Done"){
        this.transferTaskToArray(this.colums[1].tareas, this.colums[2].tareas, event.previousIndex, event.currentIndex);
      } else if (col == "Done" && col2 == "To Do"){
        this.transferTaskToArray(this.colums[2].tareas, this.colums[0].tareas, event.previousIndex, event.currentIndex);
      }else{
        this.transferTaskToArray(this.colums[2].tareas, this.colums[1].tareas, event.previousIndex, event.currentIndex);
      }

    }
    console.log("Previous container " + event.container.data);
    console.log("Previous index " +event.previousIndex);
    console.log("container " + event.container.data);
    console.log("Current index " + event.currentIndex);
    console.log("Distanse " + JSON.stringify(event.distance));
    console.log("Pointer over container " + event.isPointerOverContainer);
    console.log("item " + event.item.data);
  }

  private transferTaskToArray(origen: TaskDto[], destiny: TaskDto[], preIndex: number, newIndex: number) {
    
    let save = origen[preIndex];
    origen.splice(preIndex, 1);
    destiny.splice(newIndex, 0, save);
    console.log("origen  " + origen)
    console.log("destino  " +destiny)

  }

  private moveInArray(container: ColumDto, preIndex: number, newIndex: number) {

    let arrayTareas = container.tareas;
    let save = arrayTareas[preIndex];
    arrayTareas.splice(preIndex, 1);
    arrayTareas.splice(newIndex, 0, save);

  }

  connectColums(name: string) {
    let res: string;
    if (name == "To Do"){
        res = "[reviewList,doneList]"
    } else if (name == "Done"){
        res = "[reviewList,todoList]"
    }else{
        res = "[doneList,todoList]"
    }
 }

}
