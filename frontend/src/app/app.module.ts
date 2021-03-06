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
import { LibrianListComponent, DialogOverviewPasswordDialog } from './librian/librian-list/librian-list.component';
import { LibrianEditComponent } from './librian/librian-edit/librian-edit.component';
import { ReaderComponent } from './reader/reader.component';
import { AddReaderComponent } from './reader/reader.component';
import { EditReaderComponent } from './reader/reader.component';
import { TokenInterceptor } from './token.interceptor';
import { CheckoutComponent } from './checkout/checkout.component';
import {BookLoanComponent} from "./bookloan/book-loan.component";
import { CheckinComponent } from './checkin/checkin.component';
import { DummyComponent } from './dummy/dummy.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
    AddReaderComponent,
    EditReaderComponent,
    DialogOverviewPasswordDialog,
    CheckoutComponent,
    BookLoanComponent,
    CheckinComponent,
    DummyComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [AddReaderComponent, EditReaderComponent, DialogOverviewPasswordDialog]
})
export class AppModule { }
