import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {BookloanService} from "../services/bookloan.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'book-loan',
  templateUrl: `./book-loan.component.html`,
  styleUrls: [`./book-loan.component.css`]
})
export class BookLoanComponent implements OnInit {
  
  private subscription: Subscription;
  private bookCheckouts:any;
  private bookCheckins:any;

  checkin_title = "Check-Ins:"
  checkout_title = "Check-outs:"
  tableColumns = ['book_id', 'book_title', 'user_id', 'user_name', 'checkin_date', 'checkout_date', 'action'];
  checkinSource:any;
  checkoutSource:any;

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
    this.checkinSource = new MatTableDataSource(this.checkins);
    this.checkoutSource = new MatTableDataSource(this.checkouts);
  }

  ngOnInit() {

  }

  checkout(row){
    console.log(row);
  }
  deleteCheckout(row)
  {
    console.log(row);
  }
}
