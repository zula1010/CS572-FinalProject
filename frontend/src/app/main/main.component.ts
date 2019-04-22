import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';

// const MY_ROUTES:Routes = [
//   {path:'', component:UsersComponent},
//   {path:':uuid',component:UserdetailsComponent,canActivate: [MyGuardGuard]}
// ]

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  // fillerNav = Array.from({length: 2}, (_, i) => `Nav Item ${i + 1}`);
  adminMenus = [{ routeLink: ["admin", "lib"], text: "Librian" }, { routeLink: ["admin", "book"], text: "book" }, { routeLink: ["admin", "reader"], text: "reader" }];
  libMenus = [{ routeLink: ["lib", "checkout"], text: "check out" }, { routeLink: ["lib", "checkin"], text: "check In" }];
  roles: Array<string> = [];
  // options: FormGroup;
  @ViewChild('snav') public snav;

  constructor(private router: Router, private route: ActivatedRoute, private loginService: LoginService) {
    // this.options = fb.group({
    //   bottom: 0,
    //   fixed: false,
    //   top: 0
    // });
  }
  menuClick(e, routerLink) {
    this.router.navigate(routerLink, { relativeTo: this.route }).then(() => {
      this.snav.close();
    });
  }
  ngOnInit() {
    this.roles = this.loginService.getRoles();
  }

}
