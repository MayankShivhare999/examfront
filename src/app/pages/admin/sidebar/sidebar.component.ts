import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  public logout() {
    this.loginService.logout();
    // this.isLoggedIn = false;
    // this.user = null;
    window.location.reload();
    // this.loginService.loginStatusSubject.asObservable
  }

}
