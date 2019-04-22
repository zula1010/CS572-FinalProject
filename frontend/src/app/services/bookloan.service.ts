import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookloanService {

  constructor() { }

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
}
