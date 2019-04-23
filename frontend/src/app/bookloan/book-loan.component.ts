import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {BookloanService} from "../services/bookloan.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'book-loan',
  templateUrl: `./book-loan.component.html`,
  styleUrls: [`./book-loan.component.css`]
})
export class BookLoanComponent implements OnInit {
  @ViewChild(MatPaginator) checkins_paginator: MatPaginator;
  @ViewChild(MatSort) checkins_sort: MatSort;

  @ViewChild(MatPaginator) checkouts_paginator: MatPaginator;
  @ViewChild(MatSort) checkout_sort: MatSort;

  private subscription: Subscription;


  checkin_title = "Check-Ins:"
  checkout_title = "Check-outs:"
  tableColumns = ['book_id', 'book_title', 'user_id', 'user_name', 'checkin_date', 'checkout_date', 'action'];
  checkinSource:MatTableDataSource<any>;
  checkoutSource:MatTableDataSource<any>;

  checkouts = [
    {book_id: 'book_id', book_title: 'book_title', user_id: 'user_id', user_name: 'user_name', checkin_date: 'checkin_date', checkout_date: 'N/A', action:'action'},
    {book_id: 'book_id', book_title: 'book_title', user_id: 'user_id', user_name: 'user_name', checkin_date: 'checkin_date', checkout_date: 'N/A', action:'action'},
    {book_id: 'book_id', book_title: 'book_title', user_id: 'user_id', user_name: 'user_name', checkin_date: 'checkin_date', checkout_date: 'N/A', action:'action'},

  ];
  // this checkins = this.checkouts;
  checkins = [

    {book_id: 'book_id', book_title: 'book_title', user_id: 'user_id', user_name: 'user_name', checkin_date: 'checkin_date', checkout_date: 'checkout_date', action:'action'},
    {book_id: 'book_id', book_title: 'book_title', user_id: 'user_id', user_name: 'user_name', checkin_date: 'checkin_date', checkout_date: 'checkout_date', action:'action'},
    {book_id: 'book_id', book_title: 'book_title', user_id: 'user_id', user_name: 'user_name', checkin_date: 'checkin_date', checkout_date: 'checkout_date', action:'action'},
  ];

  constructor( private route: ActivatedRoute, private bookLoadService: BookloanService) {

    this.subscription = route.params.subscribe( params =>{
      console.log (params);
    })
    // this.checkinSource = new MatTableDataSource(this.checkins);
    // this.checkoutSource = new MatTableDataSource(this.checkouts);
  }

  ngOnInit() {

    this.checkoutSource = new MatTableDataSource(this.checkouts);
    // this.checkinSource.paginator = this.checkins_paginator;
    // this.checkinSource.sort= this.checkins.sort;

    this.checkinSource = new MatTableDataSource(this.checkins);
    // this.checkoutSource.paginator = this.checkins_paginator;
    // this.checkoutSource.sort = this.checkins.sort;

  }

  checkout(row){
    console.log(row);
  }
  deleteCheckout(row)
  {
    console.log(row);
  }
}
