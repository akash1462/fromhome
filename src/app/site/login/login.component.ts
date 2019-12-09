import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private formBuild: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  toSignup() {
    this.router.navigate(['signup'])
  }

  getUsername() {
    return this.loginForm.value['username'];
  }

  getPassword() {
    return this.loginForm.value['password'];
  }

  invalidLogin: boolean;
  error: string = "Login Failed"

  ngOnInit() {
    this.loginForm = this.formBuild.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    })
  }


  onSubmit(user) {
    this.authService.authenticate(this.getUsername(), this.getPassword()).subscribe(
      data => {
        //console.log("onsubmit working")
        this.invalidLogin = false
        this.authService.setToken(data.token);
        this.error = "Logged In successfully";
        this.authService.loggedIn = true;
        // this.foodService.isLoggedIn = true;
        this.authService.username = this.getUsername();
        this.router.navigate(['home'])
        
        if (data.role == 'USER')
          this.authService.user = true;
          //  console.log("admin ")
        else if(data.role == 'MENTOR')
           this.authService.mentor = true;
          //console.log("user")
        
        this.authService.username = this.getUsername();
        console.log("logged in");
        
        //this.router.navigate(['']);
        //this.router.navigate(['Menu'])
        //console.log("Token Generated"+data.token);
        //console.log("Token Generated"+data.role);

      },
      error => {
        this.invalidLogin = true
        if (error.status == 401)
          this.error = "Invalid Username or Password";
        console.log(error);
      }
    );
  }
}
