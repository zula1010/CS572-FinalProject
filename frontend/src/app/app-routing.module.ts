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

import {BookLoanComponent} from "./bookloan/book-loan.component";

const routes: Routes = [
  // { path: 'librian',BookCheckInOutComponentcomponent: LibrianComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainComponent, canActivate: [SecureGuard],
    children: [
      { path: 'admin/reader', component: ReaderComponent },
      // { path: 'lib/checkout', component: CheckoutComponent },
      { path: 'lib/checkout', component: BookLoanComponent },
      { path: 'lib/checkin', component: BookLoanComponent },

      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'admin/books', loadChildren: './books/books.module#BooksModule' },
      { path: 'lib/loan', loadChildren: './bookloan/bookloan.module#BookloanModule' },
      {
        path: 'admin/lib', component: LibrianComponent, children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: LibrianListComponent },
          { path: 'new', component: LibrianEditComponent, canDeactivate:[DeactivateGuardService] },
          { path: 'edit', component: LibrianEditComponent, canDeactivate:[DeactivateGuardService] }
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
