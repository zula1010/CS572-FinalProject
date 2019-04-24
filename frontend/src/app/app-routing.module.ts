import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrianComponent } from './librian/librian.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LibrianListComponent } from './librian/librian-list/librian-list.component';
import { LibrianEditComponent } from './librian/librian-edit/librian-edit.component';
import { ReaderComponent } from './reader/reader.component';
import { SecureGuard } from './secure.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { DeactivateGuardService } from './deactivate-guard.service';
// import {BooksModule} from "./books/books.module";

import { BookLoanComponent } from "./bookloan/book-loan.component";
import { CheckinComponent } from './checkin/checkin.component';
import { DummyComponent } from './dummy/dummy.component';
import { RoleGuard } from './role.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  // { path: 'librian',BookCheckInOutComponentcomponent: LibrianComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  {
    path: 'main', component: MainComponent, canActivate: [SecureGuard],
    children: [
      { path: 'admin/reader', component: ReaderComponent, canActivate: [RoleGuard], data: {role: 'admin'} },
      { path: 'lib/checkout', component: CheckoutComponent,canActivate: [RoleGuard], data: {role: 'lib'} },
      // { path: 'lib/checkout', component: BookLoanComponent },
      { path: 'lib/checkin', component: CheckinComponent, canActivate: [RoleGuard], data: {role: 'lib'}},
      { path: 'dummy', component: DummyComponent},

      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'admin/books', loadChildren: './books/books.module#BooksModule' , canActivate: [RoleGuard],data: {role: 'admin'} },
      // { path: 'lib/loan', loadChildren: './bookloan/bookloan.module#BookloanModule' },
      {
        path: 'admin/lib', component: LibrianComponent, canActivate: [RoleGuard],data: {role: 'admin'}, children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: LibrianListComponent },
          { path: 'new', component: LibrianEditComponent, canDeactivate: [DeactivateGuardService] },
          { path: 'edit', component: LibrianEditComponent, canDeactivate: [DeactivateGuardService] }
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
