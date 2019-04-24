import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LibrianService } from '../librian.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private librianService: LibrianService) {
    this.checkinForm = formBuilder.group({
      'bookId': ['', [Validators.required]]
    })
  }
  checkinForm: FormGroup;
  @ViewChild('bookId') bookId: ElementRef;
  ngOnInit() {
  }

  onCheckin() {
    console.log(this.checkinForm.value);
    this.librianService.checkin(this.checkinForm.value).subscribe(data => {
      if (data["result"]) {
        alert("Checkin sucess");

        this.checkinForm.reset();
        this.bookId.nativeElement.focus();

      } else {
        alert(data["message"]);
      }
    });
  }
}
