import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { LibrianService } from 'src/app/librian.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { LibrianElement } from '../librian.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-librian-list',
  templateUrl: './librian-list.component.html',
  styleUrls: ['./librian-list.component.css']
})
export class LibrianListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['modify', 'position', 'firstname', 'lastname', 'email', 'phoneNumber', 'roles', 'createDate', 'modifyDate'];
  resultsLength = 0;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  dataSource: Array<LibrianElement> = [];

  constructor(private librianService: LibrianService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  edit(element) {
    this.router.navigate(["edit"], { relativeTo: this.route.parent, queryParams: { id: element._id } })
  }
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
}
