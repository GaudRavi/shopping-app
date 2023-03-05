import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  islogin: boolean = false;
  constructor(public authservice: AuthService) { }

  ngOnInit() {
    this.authservice.isUserLogedIn.subscribe(res => this.islogin = res);
  }

}
