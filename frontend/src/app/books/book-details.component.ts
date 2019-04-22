import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
 } from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {BookService} from "../services/book.service";

@Component({
  selector: 'book-details',
  templateUrl:`book-details.component.html`,
  styleUrls: ['./books.component.css']
})
export class BookDetailsComponent implements OnInit {
  private title = 'Book Details:';
  private subscription: Subscription;
  detailsForm: FormGroup;
  private book_id = '';
  private showCreate: boolean = true;

  private viewStatus = {
    enableBookCopy: true,
    disableCreate: false
  }

  //Default values
  private bookDetails:any =  {
    book_id: '',
    title: "Default",
    des:'Default',
    isbn: 'Default',
    author: 'Default',
    loan_duration:15,
    number_of_copies: 5,
    book_copies:[{
      note: 'Note',
      created_date: new Date(),
      copies:[{
        copy_id: "copy_id",
      }]
    }],
  };
   constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private bookService: BookService ) {

    this.subscription =  this.route.params.subscribe( (params) =>{
      this.book_id = params.book_id;
      if(this.book_id ==''){
        this.viewStatus.disableCreate = false;
        this.viewStatus.enableBookCopy = false;
        
      }else{
       this.viewStatus.disableCreate = true;
        this.viewStatus.enableBookCopy = true;
      }
    })
  }

  ngOnInit() {
    if(this.book_id != '') {
      this.bookService.getBookDetails(this.book_id)
        .then((bookDetails) => {
          this.bookDetails = bookDetails;
        })
        .catch((err) => {
          console.log('ERROR GETTING DATA:', err);
        })
    }
    this.buildForm();
  }

  onSubmit() {
    console.log("onSubmit:",  this.detailsForm);
  }

  //Create book
  onCreate(){
      let bookInfo =  this.getBookInfo();
      this.bookService.createBook(bookInfo)
        .then( result =>{
          console.log(result);
        })
        .catch(err =>{
          console.log("ERROR: ", err);
        })
  }
  onSave(){
    let bookInfo =  this.getBookInfo();
    bookInfo.book_id = this.book_id;
    //Don't update book copies
    bookInfo.copy_number = 0;
    console.log("Save book:",bookInfo );
    this.bookService.saveBook(bookInfo)
      .then( result =>{
        console.log(result);
      })
      .catch(err =>{
        console.log("ERROR: ", err);
      })
  }
  onDelete(){
    this.bookService.deleteBook(this.book_id)
      .then( result =>{
        console.log(result);
      })
      .catch(err =>{
        console.log("ERROR: ", err);
      })
  }

  onClose(){
    this.router.navigate(['main/admin/books'])
  }

  private buildForm(){

    //Build the form
    this.detailsForm = this.fb.group({
      'book_info': this.fb.group({
        'book_title': [this.bookDetails.title, []],
        'isbn':[this.bookDetails.isbn, [Validators.required]],
        'des': [this.bookDetails.des, Validators.required],
        'author':[this.bookDetails.author, [Validators.required]],
        'loan_duration':[this.bookDetails.loan_duration, [Validators.required]]
      }),
      'book_copies': this.fb.group({
        'copy_note': [this.bookDetails.book_copies[0].note,  [Validators.required]],
        'copy_number': [this.bookDetails.number_of_copies, [Validators.required]]
      })
    })
  }
  private getBookInfo():any{
    let bookInfo = {
      book_id: '',
      title:this.detailsForm.get('book_info').get('book_title').value,
      isbn:this.detailsForm.get('book_info').get('isbn').value,
      des:this.detailsForm.get('book_info').get('des').value,
      author: [this.detailsForm.get('book_info').get('author').value],
      loan_duration: this.detailsForm.get('book_info').get('loan_duration').value,
      price: 0,
      image:"imageurl",
      number_of_copies:0,
      copy_number: this.detailsForm.get('book_copies').get('copy_number').value,
      copy_note: this.detailsForm.get('book_copies').get('copy_note').value,
      tag:["Web", "Programming"],
      created_date:new Date(),
      modified_date: new Date(),
    };
    console.log("getBookInfo: ", bookInfo);
    return bookInfo;
  }

}
