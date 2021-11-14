import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationDataService } from '../services/application-data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  serverError: string = "";

  signupForm = {
    email: "",
    password: ""
  }

  constructor(private userService: UserService, private router: Router, private applicationDataService: ApplicationDataService) { }

  ngOnInit(): void {
  }

  signinFormSubmit(value: any){
    this.userService.userLogin(value).subscribe((data)=>{
      setTimeout(()=>{
        this.router.navigate(['/']);
        this.applicationDataService.setData(true);
      }, 1000);
    }, (error)=>{
      this.serverError = error;
    });
  }

}
