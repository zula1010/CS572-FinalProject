import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReaderService } from '../reader.service';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  displayedColumns: string[] = ['position', 'firstname', 'lastname', 'email'];
  dataSource
  @ViewChild(MatPaginator) paginator: MatPaginator;
  myData;
  constructor(private formBuilder: FormBuilder, private service: ReaderService, public dialog: MatDialog) {
    service.getReader().subscribe(data => { this.dataSource = data; console.log(data) });
    this.dataSource = new MatTableDataSource(this.myData);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(AddReaderComponent, dialogConfig);

    const dialogRef = this.dialog.open(AddReaderComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );

  }

  ngOnInit() {
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
      }),

    });
  }

  ngOnInit() {
  }

  save() {
    this.service.addReader(this.form.value).subscribe(data => console.log(data));
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}