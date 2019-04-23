import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatSortable, MatTableDataSource, Sort} from "@angular/material";
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
    }
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
        this.sort.sort(<MatSortable>({id: 'title', start: 'asc'}));

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
