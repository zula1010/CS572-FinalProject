import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {BookService} from "../services/book.service";

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  title =  'Books';
  // button_title = "Show Details";
  dataSource:any;
  tableColumns = ['book_id', 'isbn', 'title', 'author','action'];
  constructor(private router: Router, private bookService: BookService) {
  }

  viewDetails(row){
    console.log(row);
   //this.router.navigate(['books', row.book_id])
    this.router.navigate(['main/admin/books', row.book_id])


  }
  ngOnInit() {
    this.bookService.getBooks()
      .then( books =>{
        let newRow = {
            book_id: '',
            isbn: '',
            title: '',
            author: '',
            action:''};
        books[books.length] = (newRow);
        this.dataSource =  new MatTableDataSource(books)
      })
      .catch(err =>{
        this.dataSource =  new MatTableDataSource([])
        console.log('ERROR GETTING DATA:', err);
      })
  }
  getTitle(row){
    if(row.book_id == ''){
      return "New";
    }else{
      return "Details";
    }
  }
}
