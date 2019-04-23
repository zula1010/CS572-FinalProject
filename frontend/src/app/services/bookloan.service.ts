import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookloanService {

  constructor( public http: HttpClient) { }

  public getBookLoan(book_id){

    let promise = new Promise ( (resolve, reject) => {
        let bookloan = [
          {copy_id: 'book copy_id', status:'checkin',borrower_id: 'user Id', borrower_name: 'User Name',due_date: new Date(),borrow_date: new Date(), return_date: new Date()},
          {copy_id: 'book copy_id', status:'checkin',borrower_id: 'user Id', borrower_name: 'User Name',due_date: new Date(),borrow_date: new Date(), return_date: new Date()},
          {copy_id: 'book copy_id', status:'checkout',borrower_id: 'user Id', borrower_name: 'User Name',due_date: new Date(),borrow_date: new Date(), return_date: new Date()},
          {copy_id: 'book copy_id', status:'checkin',borrower_id: 'user Id', borrower_name: 'User Name',due_date: new Date(),borrow_date: new Date(), return_date: new Date()},
          {copy_id: 'book copy_id', status:'checkout',borrower_id: 'user Id', borrower_name: 'User Name',due_date: new Date(),borrow_date: new Date(), return_date: new Date()},
          {copy_id: 'book copy_id', status:'checkout',borrower_id: 'user Id', borrower_name: 'User Name',due_date: new Date(),borrow_date: new Date(), return_date: new Date()},
          {copy_id: 'book copy_id', status:'checkin',borrower_id: 'user Id', borrower_name: 'User Name',due_date: new Date(),borrow_date: new Date(), return_date: new Date()},
          {copy_id: 'book copy_id', status:'checkout',borrower_id: 'user Id', borrower_name: 'User Name',due_date: new Date(),borrow_date: new Date(), return_date: new Date()}
        ]
        resolve(bookloan);
      })
    return promise;
    }

  public checkout ( checkoutRecord){
    let promise = new Promise((resolve, reject) => {
      let url = 'http://localhost:3000/books/checkout';
      this.http.put(url, checkoutRecord).subscribe(res =>{
        console.log('Data Received: ', JSON.parse(res['result']));
        resolve(JSON.parse(res['result']))
      });
    });
    return promise;
  }

  public checkin ( checkinRecord){
    let promise = new Promise((resolve, reject) => {
      let url = 'http://localhost:3000/books/checkin';
      this.http.put(url, checkinRecord).subscribe(res =>{
        console.log('Data Received: ', JSON.parse(res['result']));
        resolve(JSON.parse(res['result']))
      });
    });
    return promise;
  }

}
