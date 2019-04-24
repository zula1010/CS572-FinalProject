import { Component, OnInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReaderService } from '../reader.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { LibrianService } from '../librian.service';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, AfterContentInit {
  ngAfterContentInit(): void {
    setTimeout(() => {

      this.readerId.nativeElement.focus();

    }, 0);
  }
  checkoutForm: FormGroup;
  readerName: string = "";
  ngOnInit() {


  }

  @ViewChild('readerId') readerId: ElementRef;

  constructor(private formBuilder: FormBuilder, private librianService: LibrianService, private router: Router, private route: ActivatedRoute) {
    this.checkoutForm = formBuilder.group({
      'readerId': ['', [Validators.required], [librianService.readerValidator()]],
      'bookId': ['', [Validators.required]]
    })
  }
  redirectTo() {
    let parent = this.route.parent
    this.router.navigate(['dummy'], { skipLocationChange: true, relativeTo: parent })
      .then(() =>
        this.router.navigate(["lib/checkout"], { relativeTo: parent })
      );
  }
  onCheckout() {
    console.log(this.checkoutForm.value);
    this.librianService.checkout(this.checkoutForm.value).subscribe(data => {
      if (data["result"]) {
        alert("Checkout sucess111, please return book before: " + formatDate(data["data"]["due_date"], "MM-dd-yyyy", "en-US"));
        // this.checkoutForm.mar
        // this.readerName = "";
        // this.checkoutForm.reset();
        // this.checkoutForm.markAsPristine();
        // this.checkoutForm.markAsUntouched();
        // this.checkoutForm.updateValueAndValidity();
        // this.readerId.nativeElement.focus();
        this.redirectTo();

      } else {
        alert(data["message"]);
      }
    });
  }
  retrieveReader(val) {
    if (!val) {
      return;
    }
    this.librianService.retrieveReader(val).subscribe(data => {
      console.log(data);
      if (data["result"]) {
        this.readerName = data["data"]["firstname"] + " " + data["data"]["firstname"];
      } else {
        this.readerName = "";
      }
    })
  }

}
