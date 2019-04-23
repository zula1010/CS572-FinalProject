import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class BookService {

  constructor( public http: HttpClient) {

  }

  public searchBook(searchParam):any{
    let promise = new Promise((resolve, reject) => {
      let search = {
        text: 'Web',
        isbn: ''
      };
      let reqParams = new HttpParams();
      // Begin assigning parameters
      reqParams.append('text', searchParam);
      reqParams.append('isbn', '');

      let url = 'http://localhost:3000/books/search';
      this.http.get(url, {params: search}).subscribe(res =>{
        console.log('Data Received: ', JSON.parse(res['result']));
        resolve(JSON.parse(res['result']))
      });
    });
    return promise;
  }



  public  getBooks():any{

    let promise = new Promise((resolve, reject) => {
      let url = 'http://localhost:3000/books';
      this.http.get(url).subscribe(res =>{
        console.log('Data Received: ', JSON.parse(res['result']));
        resolve(JSON.parse(res['result']))
      });
    });
    return promise;
  }

  public  getBookDetails(book_id:string){

    let promise = new Promise((resolve, reject) => {
      let url = 'http://localhost:3000/books/book';
      let reqParams = new HttpParams().set('book_id', book_id);
      this.http.get(url, {params: reqParams}).subscribe(res =>{
        const dataReceived: any[] = JSON.parse(res['result']);
        if(dataReceived.length > 0){
         resolve(dataReceived[0])
          console.log('Data Received: ', dataReceived[0]);
        }else{
          resolve({})
          console.log('Data Received: ', dataReceived)
        }
     });
    });

    return promise;
  }

  public  getBookCheckout(book_id:string){
    let promise = new Promise((resolve, reject) => {
      let checkins = [

        {book_id: 'book_id', book_title: 'book_title', user_id: 'user_id', user_name: 'user_name', checkin_date: 'checkin_date', checkout_date: 'checkout_date', action:'action'},
        {book_id: 'book_id', book_title: 'book_title', user_id: 'user_id', user_name: 'user_name', checkin_date: 'checkin_date', checkout_date: 'checkout_date', action:'action'},
        {book_id: 'book_id', book_title: 'book_title', user_id: 'user_id', user_name: 'user_name', checkin_date: 'checkin_date', checkout_date: 'checkout_date', action:'action'},
      ];
      resolve(checkins);
    });
    return promise;
  }

  public createBook(bookInfo: any){

    let promise = new Promise((resolve, reject) => {
      let url = 'http://localhost:3000/books';
      this.http.post(url, bookInfo).subscribe(res =>{
        console.log('Data Received: ', res);
        resolve(res)
      });
    });

    return promise;
  }

  public saveBook(bookInfo: any){

    let promise = new Promise((resolve, reject) => {
      let url = 'http://localhost:3000/books';
      this.http.put(url, bookInfo).subscribe(res =>{
        console.log('Data Received: ', res);
        resolve(res)
      });
    });
    return promise;
  }

  public deleteBook(book_id:string){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { book_id: book_id},
    };
    let promise = new Promise((resolve, reject) => {
      let url = 'http://localhost:3000/books/book';
      this.http.delete(url, options).subscribe(res =>{
        console.log('Data Received: ', res);
        resolve(res)
      });
    });
    return promise;
  }
}
