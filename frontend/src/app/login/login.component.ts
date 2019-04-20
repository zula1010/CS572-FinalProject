import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = "Login";
  signInForm: FormGroup;
  failed:boolean;
  ngOnInit() {
    this.loginService.logOut();
  }
  constructor(private router: Router, private formBuilder: FormBuilder, private loginService: LoginService) {
    this.signInForm = formBuilder.group({
      "username": ['',
        [Validators.required, Validators.email]],
      "password": ['', [Validators.required]]
    });
  }
  login(): void {
    // console.log(this.signInForm.value);
    this.loginService.login(this.signInForm.value).subscribe((data)=>{
      if(!data["result"])
      {
        this.failed = true;
      }
    });
  }
}
