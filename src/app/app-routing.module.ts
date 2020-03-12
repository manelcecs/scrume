import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { TeamComponent } from './team/team.component';
import { TeamCreateComponent } from './team-create/team-create.component';


const routes: Routes = [

  {path: 'bienvenida', component: BienvenidaComponent},
  {path: 'wellcome', component: WellcomeComponent},
  {path: 'teams', component: TeamComponent},
  {path: 'teamsCreate', component: TeamCreateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
