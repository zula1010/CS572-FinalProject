import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrianComponent } from './librian/librian.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  // { path: 'librian', component: LibrianComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'loginOut', redirectTo: '/login', pathMatch: 'full' },
  // {path : '', component : LoginComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
