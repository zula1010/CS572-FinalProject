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
  displayedColumns: string[] = ['edit', 'delete', 'position', 'firstname', 'lastname', 'email'];
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

  addReader() {
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

  edit(mydata) {
    console.log(mydata);
    console.log(this.dataSource.data)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.dialogRef = this.dialog.open(
      EditReaderComponent,
      {
        data: mydata
      });
    this.dialogRef
      .afterClosed().subscribe(
        data => {
          if (data) {
            // this.dataSource.data.push(data);
            // let arr = this.dataSource.data;
            // arr.unshift(data);
            // this.dataSource = new MatTableDataSource(arr);
            // this.dataSource.paginator = this.paginator;
            var newData = this.dataSource.data.map((row) => row._id === data._id ? data : row);
            this.dataSource = new MatTableDataSource(newData);
          }
        });
  }
  delete(data) {
    if (confirm("Are you sure to delete?")) {
      console.log(data);
      this.service.deleteReader(data).subscribe(
        data => {
          if (data) {
            // this.dataSource.data.push(data);
            var newData = this.dataSource.data.filter((row) => row._id !== data["id"]);
            this.dataSource = new MatTableDataSource(newData);
            this.dataSource.paginator = this.paginator;
          }
        });
    }

  }

}
////////ADD READER COMPONENT

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
      'firstname': [, Validators.required],
      'lastname': ['', [Validators.required]],
      'email': ['', [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
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

  add() {
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

// EDIT READER COMPONENT

@Component({
  selector: 'edit-dialog',
  templateUrl: './editreader.component.html',
  // styleUrls: ['./addreader.component.css']
})
export class EditReaderComponent implements OnInit {

  editform: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditReaderComponent>,
    private service: ReaderService) {

    this.editform = fb.group({
      'firstname': [data.firstname, Validators.required],
      'lastname': [data.lastname, [Validators.required]],
      'email': [data.email, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      'phone': [data.phone],
      'addressData': fb.group({
        'state': [data.state],
        'city': [data.city],
        'zip': [data.zip],
        'street': [data.street]
      }),

    });
  }

  ngOnInit() {
    console.log("INITIATED edit component");
  }

  save() {
    this.service
      .updateReader(this.editform.value, this.data._id)
      .subscribe(data => {
        console.log("dialog data:", data);
        this.dialogRef.close(data);
      });
  }

  close() {
    this.dialogRef.close();
  }
}