import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookLoanComponent} from "./book-loan.component";
import {BookCheckinComponent} from "./book-checkin.component";
import {BookCheckoutComponent} from "./book-checkout.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material";


@NgModule({
  declarations: [BookLoanComponent, BookCheckinComponent, BookCheckoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: ':', component: BookLoanComponent},
      {path: '', component: BookLoanComponent},
      {path: 'checkin', component: BookCheckinComponent},
      {path: 'checkout', component: BookCheckoutComponent}
    ])
  ],
  exports: [BookLoanComponent]

})
export class BookloanModule { }
