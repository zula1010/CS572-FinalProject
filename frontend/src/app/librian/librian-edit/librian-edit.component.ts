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
  mode: string = "new";
  title: string = "";
  subTitle: string="";
  id:string  = "";
  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private librianService: LibrianService) {
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
    // console.log(route.root);
    // route.root.children
    // let id = route.queryParamMap.subscribe(paramMap=>{

    // })
    route.url.subscribe(url => {
      //  console.log(url)
      if (url[0].path === "new") {
        this.title = "New"
        this.newOrEditForm = formBuilder.group({
          "firstname": ['', [Validators.required]],
          "lastname": ['', [Validators.required]],
          "email": ['', [Validators.required, Validators.email], [this.librianService.emailValidator()]],
          "password": ['', [Validators.required]],
          "phoneNumber": [''],
          "roles": [[], [Validators.required]]
        }, { validator: [] });
      } else if (url[0].path === "edit") {
        this.mode = "edit";
        this.title = "Edit"
        this.newOrEditForm = formBuilder.group({
          "firstname": ['', [Validators.required]],
          "lastname": ['', [Validators.required]],
          // "email": [''],
          "phoneNumber": [''],
          "roles": [[], [Validators.required]]
        }, { validator: [] });
        route.queryParamMap.subscribe(param => {
          this.id = param.get("id");
   
          this.librianService.get(this.id).subscribe(data => {
            console.log(data);
            if (data.result) {
              this.subTitle =  data.data.email;
              this.newOrEditForm.controls.firstname.setValue(data.data.firstname);
              this.newOrEditForm.controls.lastname.setValue(data.data.lastname);
              this.newOrEditForm.controls.phoneNumber.setValue(data.data.phoneNumber);
              this.newOrEditForm.controls.roles.setValue(data.data.roles);
            } else {
              
            }
          })

        })
      }
    })

  }


  ngOnInit() {
  }
  save() {
    console.log(this.newOrEditForm.value);
    if(this.mode==="new")
    {
      this.librianService.insertLibrian(this.newOrEditForm.value).subscribe((data) => {
        if (data["result"]) {
          this.newOrEditForm.reset();
          this.router.navigate(["list"], { relativeTo: this.route.parent });
        } else {
          alert("Failed to save data!");
        }
  
      });
    } else {
      this.librianService.updateLibrian(this.id, this.newOrEditForm.value).subscribe((data) => {
        if (data["result"]) {
          this.newOrEditForm.reset();
          this.router.navigate(["list"], { relativeTo: this.route.parent });
        } else {
          alert("Failed to save data!");
        }
  
      });
    }

  }

  canDeactivate() {
    if(this.newOrEditForm.dirty)
    {
      return window.confirm("All you changes will be discarded, are you sure to continue?");
    } else {
      return true;
    }
  }
}
