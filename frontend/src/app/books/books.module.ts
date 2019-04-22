import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import {RouterModule} from "@angular/router";
import {BookDetailsComponent} from "./book-details.component";
import {BookSearchComponent} from "./book-search.component";
import {MatTableModule} from "@angular/material";
import {Form, FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [BooksComponent, BookDetailsComponent,BookSearchComponent ],
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      // { path: '', component:BooksComponent,
      //   children:[{path:':book_id', component:BookDetailsComponent}]
      // },
      // {path: 'search', component: BookSearchComponent },
      // {path: 'checkin', component: BookCheckInOutComponent },
      // {path: 'checkout', component: BookCheckInOutComponent }

      {path: '', component:BooksComponent},
      {path: ':book_id', component:BookDetailsComponent},
      {path: 'search', component: BookSearchComponent },
      // {path: 'checkin', component: BookCheckInOutComponent },
      // {path: 'checkout', component: BookCheckInOutComponent }
    ])
  ],
  exports: [BooksComponent]
})
export class BooksModule { }
