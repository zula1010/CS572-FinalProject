import { Component, OnInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LibrianService } from '../librian.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit, AfterContentInit {
  ngAfterContentInit(): void {
    setTimeout(() => {

      this.bookId.nativeElement.focus();

    }, 0);
  }

  constructor(private formBuilder: FormBuilder, private librianService: LibrianService, private router: Router, private route: ActivatedRoute) {
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

        // this.checkinForm.reset();
        // this.bookId.nativeElement.focus();
        this.redirectTo();

      } else {
        alert(data["message"]);
      }
    });
  }

  redirectTo() {
    let parent = this.route.parent
    this.router.navigate(['dummy'], { skipLocationChange: true, relativeTo: parent })
      .then(() =>
        this.router.navigate(["lib/checkin"], { relativeTo: parent })
      );
  }
}
