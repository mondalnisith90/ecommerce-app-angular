import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  

  signupForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    mobile: new FormControl("", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    address: new FormControl("")
  });

  private newUser: User = {} as User;
  serverError: string = "";


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  signupFormSubmit(){
    this.newUser = this.signupForm.value;
    this.userService.userRegistration(this.newUser).subscribe((serverResponse: any)=>{
      this.signupForm.reset();
      this.serverError = "";
      alert("Registration successfull");
      this.router.navigate(['/signin']);
    }, (error)=>{
      this.serverError = error;
      console.log(error)
    });

  }

}
