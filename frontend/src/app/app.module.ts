import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LibrianComponent } from './librian/librian.component';
import { MaterialModule } from './core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LibrianListComponent } from './librian/librian-list/librian-list.component';
import { LibrianEditComponent } from './librian/librian-edit/librian-edit.component';
import { ReaderComponent } from './reader/reader.component';
import { AddReaderComponent } from './reader/reader.component';
// import {BooksModule} from "./books/books.module";
// import {BookloanModule} from "./bookloan/bookloan.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LibrianComponent,
    MainComponent,
    DashBoardComponent,
    LibrianListComponent,
    LibrianEditComponent,
    ReaderComponent,
    AddReaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // BooksModule,
    // BookloanModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddReaderComponent]
})
export class AppModule { }
