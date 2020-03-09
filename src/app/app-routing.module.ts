import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { ProjectComponent } from './project/project.component';


const routes: Routes = [

  {path: 'bienvenida', component: BienvenidaComponent},
  {path: 'wellcome', component: WellcomeComponent},
  {path: 'project', component: ProjectComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
