import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { LibrianService } from 'src/app/librian.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { LibrianElement } from '../librian.component';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-librian-list',
  templateUrl: './librian-list.component.html',
  styleUrls: ['./librian-list.component.css']
})
export class LibrianListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['changepwd','remove', 'modify', 'position', 'firstname', 'lastname', 'email', 'phoneNumber', 'roles', 'createDate', 'modifyDate'];
  resultsLength = 0;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  dataSource: Array<LibrianElement> = [];

  constructor(private librianService: LibrianService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
  }
  edit(element) {
    this.router.navigate(["edit"], { relativeTo: this.route.parent, queryParams: { id: element._id } })
  }
  remove(element) {
    this.librianService.deleteLibrian(element._id).subscribe(data => {
      if (data["result"]) {
        this.dataSource = this.dataSource.filter(row => row._id !== element._id);
        this.resultsLength--;
        this.paginator.page.next();
      }
    });
  }
  changepwd(element) {
    const dialogRef = this.dialog.open(DialogOverviewPasswordDialog, {
      width: '250px',
      data: { id: element._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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

export interface DialogPasswordData {
  id: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
  <form [formGroup]="passwordForm">
  <mat-form-field class="input-full-width">
    <input matInput required type="password" placeholder="Password" formControlName="password">
  </mat-form-field>
  <div mat-dialog-actions>
    <button mat-raised-button (click)="cancel()">cancel</button>
    <button mat-raised-button (click)="confirm()" [disabled]="!passwordForm.valid">Confirm</button>
  </div>
  </form>
  `,
})
export class DialogOverviewPasswordDialog {
  password: string;
  passwordForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewPasswordDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogPasswordData,private formBuilder: FormBuilder,private librianService: LibrianService) {

      this.passwordForm = formBuilder.group({
        "password": ['', [Validators.required]]});
     }

  confirm(): void {
    this.librianService.updateLibrianPassword(this.data.id, this.passwordForm.value.password).subscribe(()=>{
      this.dialogRef.close();
    }, (err)=>{
      alert("failed to update password, please try again!");
    });

  }
  cancel(): void {
    this.dialogRef.close();
  }

}
