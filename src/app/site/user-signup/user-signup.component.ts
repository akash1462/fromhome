import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  signUpForm: FormGroup;
  user: User;
  userCreated: boolean;
  error: string;
  switch:boolean=false;
  optionvalue:string;

  constructor(private formBuilder: FormBuilder, private userService: UserService,private router: Router) { }
  
  get userid() {
    return this.signUpForm.get('userid');
  }
  get firstname() {
    return this.signUpForm.get('firstname');
  }
  get lastname() {
    return this.signUpForm.get('lastname');
  }

  get contact() {
    return this.signUpForm.get('contact');
  }

  get role(){
    return this.signUpForm.get('role');
  }

  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      userid: ['', [
        Validators.required,
      ]],
      firstname: ['', [
        Validators.required
      ]],
      lastname: ['', [
        Validators.required
      ]],
      contact: ['', [
        Validators.required
      ]],
      role: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
      confirmPassword: ['', [
        Validators.required,
        this.matchConfirmPassword.bind(this)
      ]]
    })
  }

  matchConfirmPassword(formControl: FormControl): { [s: string]: boolean } {
    if (this.signUpForm) {
      if (formControl.value && formControl.value.length > 0 && formControl.value !== this.signUpForm.get('password').value) {
        return { 'nomatch': true };
      }
    }
    return null;
  }

  // isuseridTaken(formControl: FormControl): { [s: string]: boolean } {
  //   if (formControl.value === 'admin') {
  //     return { 'useridTaken': true };
  //   } else {
  //     return null;
  //   }
  // }

// tovendor(){
//   this.router.navigate(['signupvendor']);
//   this.switch=true;

// }

// touser(){
//   this.switch=true;
// }

  addUser() {
    this.user = {     
    id:null,
    active:null,
    confirmedSignUp:null,
    contactNumber:this.signUpForm.value['contact'],
    firstName:this.signUpForm.value['firstname'],
    lastName: this.signUpForm.value['lastname'],
    password:this.signUpForm.value['password'],
    regCode:null,
    resetPassword:null,
    role:this.signUpForm.value['role'],
    userName: this.signUpForm.value['userid'],
 
  };

    this.userService.addUser(this.user).subscribe(data => {
      if(this.user.role == "User"){
        this.router.navigate(['login'])
        window.alert("New User Created Successfully");
      }else{
        this.router.navigate(['mentordetails'])
        this.userService.mentor = {linkedinUrl:'',user:this.user,id:null, yearsOfExperience:0};
        window.alert("mentor");
      }
    },
      error => {
        console.log("error")
        if (error.status == 500) {
          this.error = "User Already Exists";
          //this.userCreated = false;
        }
        console.log(this.error);
      }
    );
  }
}
