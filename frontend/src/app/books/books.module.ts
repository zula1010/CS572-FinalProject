import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import {RouterModule} from "@angular/router";
import {BookDetailsComponent} from "./book-details.component";
import {BookSearchComponent} from "./book-search.component";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";
import {Form, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../core/material.module";

@NgModule({
  declarations: [BooksComponent, BookDetailsComponent,BookSearchComponent ],
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatButtonModule,
    // MatFormFieldModule,
    MaterialModule,

    RouterModule.forChild([
      {path: '', component:BooksComponent},
      {path: ':action/:book_id', component:BookDetailsComponent},
      {path: 'search', component: BookSearchComponent },
      // {path: 'checkin', component: BookCheckInOutComponent },
      // {path: 'checkout', component: BookCheckInOutComponent }
    ])
  ],
  exports: [BooksComponent]
})
export class BooksModule { }
