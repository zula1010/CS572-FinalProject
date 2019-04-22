import { Component, OnInit, Input, ViewChild, Inject, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ReaderService } from '../reader.service';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  displayedColumns: string[] = ['position', 'firstname', 'lastname', 'email', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;

  dialogRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.service
      .getReader()
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  constructor(
    private formBuilder: FormBuilder,
    private service: ReaderService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private appRef: ApplicationRef) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      console.log("paginated");
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    console.log(this.dataSource.data)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.dialogRef = this.dialog.open(AddReaderComponent, dialogConfig);
    this.dialogRef
      .afterClosed().subscribe(
        data => {
          if (data) {
            // this.dataSource.data.push(data);
            let arr = this.dataSource.data;
            arr.unshift(data);
            this.dataSource = new MatTableDataSource(arr);
            this.dataSource.paginator = this.paginator;
            console.log("DATA: ", this.dataSource);
          }

        });
  }

  edit(id) {
    console.log(id);


  }
  delete(id) {
    console.log(id._id);
    this.service.deleteReader(id._id).subscribe(data => console.log("success"));
  }

}

@Component({
  selector: 'add-dialog',
  templateUrl: './addreader.component.html',
  // styleUrls: ['./addreader.component.css']
})
export class AddReaderComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddReaderComponent>,
    private service: ReaderService) {
    this.form = fb.group({
      'firstname': ['aa', Validators.required],
      'lastname': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'phone': [],
      'addressData': fb.group({
        'state': [],
        'city': [],
        'zip': [],
        'street': []
      }),

    });
  }

  ngOnInit() {
    console.log("INITIATED");
  }

  save() {
    this.service
      .addReader(this.form.value)
      .subscribe(data => {
        console.log("dialog data:", data);
        this.dialogRef.close(data);
      });
  }

  close() {
    this.dialogRef.close();
  }
}