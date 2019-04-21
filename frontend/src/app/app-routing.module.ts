import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrianComponent } from './librian/librian.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LibrianListComponent } from './librian/librian-list/librian-list.component';
import { LibrianEditComponent } from './librian/librian-edit/librian-edit.component';

const routes: Routes = [
  // { path: 'librian', component: LibrianComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'admin/lib', component: LibrianComponent, children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: LibrianListComponent },
          { path: 'new', component: LibrianEditComponent },
          { path: 'edit', component: LibrianEditComponent }
        ]
      },
      { path: 'overview', component: DashBoardComponent }
      // { path: 'specs', component: Specs }
    ]
  },
  { path: 'loginOut', redirectTo: '/login', pathMatch: 'full' },
  // {path : '', component : LoginComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
