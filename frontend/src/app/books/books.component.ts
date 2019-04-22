import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {BookService} from "../services/book.service";

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  title =  'Books';
  dataSource: MatTableDataSource<any>;
  tableColumns = ['book_id', 'isbn', 'title', 'author','action'];
  constructor(private router: Router, private bookService: BookService) {
  }


  ngOnInit() {
    this.loadBooks();
  }
  processRequest(action:string, row){
    this.router.navigate(['main/admin/books', action, row.book_id])
  }

  onDelete(row){
    console.log(row);
    this.bookService.deleteBook(row.book_id)
      .then( result =>{
        this.loadBooks();
        console.log(result);
      })
      .catch(err =>{
        console.log("ERROR: ", err);
      })

  }

  private loadBooks(){
    this.bookService.getBooks()
      .then( books =>{
        let newRow = {
          book_id: '',
          isbn: '',
          title: '',
          author: '',
          action:''};
        books[books.length] = (newRow);
        this.dataSource =  new MatTableDataSource(books);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch(err =>{
        this.dataSource =  new MatTableDataSource([])
        console.log('ERROR GETTING DATA:', err);
      })
  }

  private getStatus(view, row){
    if(row.book_id != ''){
      if( view == 'new'){
        return true;
      }else{
        return false;
      }

    }else{
      if( view == 'new'){
        return false;
      }else{
        return true;
      }
    }
  }
}
