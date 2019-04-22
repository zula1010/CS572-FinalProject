import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LibrianService } from 'src/app/librian.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(private router: Router, private route: ActivatedRoute,private formBuilder: FormBuilder, private librianService: LibrianService) {
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
      "firstname": ['', [Validators.required]],
      "lastname": ['', [Validators.required]],
      "email": ['', [Validators.required, Validators.email],[this.librianService.emailValidator()]],
      "password": ['', [Validators.required]],
      "phoneNumber": [''],
      "roles": ['',  [Validators.required]]
    }, { validator: [] });
  }


  ngOnInit() {
  }
  save() {
    console.log(this.newOrEditForm.value);
    this.librianService.insertLibrian(this.newOrEditForm.value).subscribe((data)=>{
      if(data["result"])
      {
        this.router.navigate(["list"], { relativeTo: this.route.parent });
      } else {
        alert("Failed to save data!");
      }

    });
  }
}
