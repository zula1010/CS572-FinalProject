import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { MatDialog } from '@angular/material';
import { DialogOverviewPasswordDialog } from '../librian/librian-list/librian-list.component';

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
  private adminMenus = [
    { routeLink: ["admin", "lib"], text: "Librian" },
    { routeLink: ["admin", "books"], text: "book" },
    { routeLink: ["admin", "reader"], text: "reader" }];
  private libMenus = [
    { routeLink: ["lib", "checkout"], text: "check out" },
    { routeLink: ["lib", "checkin"], text: "check In" }];

  allInOneMenus =
    [
      { role: "admin", menuList: this.adminMenus, text: "Admin Management" },
      { role: "lib", menuList: this.libMenus, text: "Check In/Out" },
    ];

  roles: Array<string> = [];
  current: number;
  // options: FormGroup;
  @ViewChild('snav') public snav;

  constructor(private router: Router, private route: ActivatedRoute, private loginService: LoginService,private dialog: MatDialog) {
    // this.options = fb.group({
    //   bottom: 0,
    //   fixed: false,
    //   top: 0
    // });
  }
  menuClick(e, routerLink, idx) {
    this.router.navigate(routerLink, { relativeTo: this.route }).then(() => {
      this.snav.close();
      this.current = idx;
    });
  }
  changepwd(element) {
    const dialogRef = this.dialog.open(DialogOverviewPasswordDialog, {
      width: '250px',
      data: { id: this.loginService.getLoginUserInfo().id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
    this.roles = this.loginService.getRoles();
  }

}
