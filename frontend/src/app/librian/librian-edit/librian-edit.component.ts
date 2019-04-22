import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LibrianService } from 'src/app/librian.service';

@Component({
  selector: 'app-librian-edit',
  templateUrl: './librian-edit.component.html',
  styleUrls: ['./librian-edit.component.css']
})
export class LibrianEditComponent implements OnInit {
  newOrEditForm: FormGroup;
  roles: Array<{
    value: string;
    selected: boolean;
    displayText: string
  }>;
  constructor(private formBuilder: FormBuilder, private librianService: LibrianService) {
    let roles = [
      {
        value: 'admin',
        selected: false,
        displayText: "Super administrator"
      },
      {
        value: 'lib',
        selected: false,
        displayText: "Pure Librian"
      }
    ];
    this.roles = roles;


    this.newOrEditForm = formBuilder.group({
      "firstName": ['', [Validators.required]],
      "lastName": ['', [Validators.required]],
      "email": ['', [Validators.required, Validators.email, this.librianService.emailValidator()]],
      "password": ['', [Validators.required]],
      "confirmPassword": ['', [Validators.required]],
      "phoneNumber": [''],
      "roles": ['']
    }, { validator: [] });
  }


  ngOnInit() {
  }
  save() {

  }
}
