import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private snak: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snak.open('Username is required', '', {
        duration: 3000,
      });
      return;
    }
    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snak.open('Password is required', '', {
        duration: 3000,
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data) => {
        console.log('Success');
        console.log(data.token);

        // login
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          console.log(user);

          // check user role
          if (this.loginService.getUserRole() == 'Admin') {
            //window.location.href="/admin";
            console.log("dashboard");
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubject.next(true);
          } else if (this.loginService.getUserRole() == 'Normal') {
            // window.location.href="/user-dashboard";
            this.router.navigate(['user-dashboard']);
            this.loginService.loginStatusSubject.next(true);
          } else {
            this.loginService.logout();
          }
        });
      },
      (error) => {
        console.log(error);
        this.snak.open('Invalid Username, password', '', {
          duration: 3000,
        });
      }
    );
  }
}
