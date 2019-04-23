import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ReaderService } from '../reader.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  message;
  reader_id;
  book_id;
  ngOnInit() {


  }

  constructor(private formBuilder: FormBuilder) {
    this.checkoutForm = formBuilder.group({
      'reader': [''],
      'book': ['']
    })
  }
  onCheckout() {
    this.reader_id = this.checkoutForm.value.reader;
    this.book_id = this.checkoutForm.value.book;
    console.log(this.reader_id + " ---" + this.book_id);
  }

}
