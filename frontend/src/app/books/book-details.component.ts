import { Component, OnDestroy, OnInit} from '@angular/core';
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
export class BookDetailsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private detailsForm: FormGroup;
  private msg = '';
  private book_id = '';
  private action = '';
  private viewStatus = {
    enableBookCopy: true,
    disableCreate: false,
    disableDelete: true,
    disableSave:true,
    disableContol: false,

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
      console.log("params: ", params)
      this.book_id = params.book_id;
      this.action = params.action;
      if(this.action =='new'){
        this.viewStatus.disableCreate = false;
        this.viewStatus.enableBookCopy = false;
        this.viewStatus.disableSave =  true;

      }else{
          if(this.action == 'view'){
          this.viewStatus.disableSave =  true;
          this.viewStatus.disableCreate = true;
        }else {
          this.viewStatus.disableCreate = true;
          this.viewStatus.enableBookCopy = true;
          this.viewStatus.disableSave = false;
          this.viewStatus.disableContol = true;
        }
      }
    })
  }


  ngOnInit() {
    this.buildForm();
    if(this.action !='new'){
    //if(this.book_id != '') {
      this.bookService.getBookDetails(this.book_id)
        .then((bookDetails) => {
          this.bookDetails = bookDetails;
          this.setFormValue();
        })
        .catch((err) => {
          console.log('ERROR GETTING DATA:', err);
        })
    }
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
          if(result['Success'] == 2){
            this.msg = result['result'];
          }else{
            this.msg = "Book created successfully!";
          }

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
    this.bookService.saveBook(bookInfo)
      .then( result =>{
        console.log(result);
        if(result['Success'] != 1){
          this.msg = 'Book saved unsuccessfully!';
        }else{
          this.msg = "Book saved successfully.";
        }
      })
      .catch(err =>{
        console.log("ERROR: ", err);
      })
  }

  onBack(){
    this.router.navigate(['main/admin/books'])
  }
  canDeactivate() {
    if(this.detailsForm.dirty)
    {
      return window.confirm("All you changes will be discarded, are you sure to continue?");
    } else {
      return true;
    }
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
    if(this.action == 'view'){
      this.detailsForm.disable();
    }
  }

  private setFormValue(){
    this.detailsForm.get('book_info').get('book_title').setValue(this.bookDetails.title);
    this.detailsForm.get('book_info').get('isbn').setValue(this.bookDetails.isbn);
    this.detailsForm.get('book_info').get('des').setValue(this.bookDetails.des);
    this.detailsForm.get('book_info').get('author').setValue(this.bookDetails.author);
    this.detailsForm.get('book_info').get('loan_duration').setValue(this.bookDetails.loan_duration);
    this.detailsForm.get('book_copies').get('copy_number').setValue(this.bookDetails.number_of_copies);
    this.detailsForm.get('book_copies').get('copy_note').setValue(this.bookDetails.book_copies[0].note);
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
      tag:[],
      created_date:new Date(),
      modified_date: new Date(),
    };
    return bookInfo;
  }

  showError(){
     if(this.msg != ''){
       return true;
     }else{
       return false;
     }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()

  }

}
