import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { LibrianService } from '../librian.service';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

// "firstname": "pretty",
// "lastname": "girl",
// "email": "pgirl@m.com",
// "password": "123",
// "phoneNumber":"123343",
// "roles":["admin", "lib"]
// "createDate": "2019-04-20T23:37:59.805Z",
// "modifyDate": "2019-04-20T23:37:59.805Z",
export interface LibrianElement {
  _id:string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  roles: Array<string>;
  password:string;
  createDate: Date;
  modifyDate: Date;
}
export interface LibrianApi {
  result: boolean;
  data: {
    items: LibrianElement[];
    total_count: number;
  }
}


@Component({
  selector: 'app-librian',
  templateUrl: './librian.component.html',
  styleUrls: ['./librian.component.css']
})
export class LibrianComponent implements OnInit {

  navLinks=[{path:'list',label:"List"},{path:'new',label:"New"}];


  constructor(private librianService:LibrianService) { }

  ngOnInit() {

  }

}
