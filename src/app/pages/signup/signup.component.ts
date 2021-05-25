import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  constructor(private userService:UserService, private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {

    if(this.user.username=='') {
      this.snack.open("Username is required", "Ok", {
        duration: 1000
      });
      return;
    }
    
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        //success
        Swal.fire('Success', 'User is registered'+data.id, 'success');
      },
      error => {
        // error
        alert('something went wrong');
      }
    )

  }

  // this.user


}
