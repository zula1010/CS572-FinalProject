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
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  roles: Array<string>;
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
export class LibrianComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'phoneNumber', 'roles', 'createDate', 'modifyDate'];
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  dataSource: Array<LibrianElement>=[];

  ngAfterViewInit(): void {
      // If the user changes the sort order, reset back to the first page.
      // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.librianService.list(this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.data.total_count;
          return data.data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource = data);
  }
  constructor(private librianService:LibrianService) { }

  ngOnInit() {

  }

}
