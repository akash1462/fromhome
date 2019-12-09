import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mentor-on-demand';

  constructor(public router: Router,private authService:AuthenticationService) {
  }

  ngOnInit(): void {
    this.loggedIn();
    this.router.navigate(['home']);

  }

  loggedIn(): boolean {
    if (this.authService.loggedIn) {
      this.authService.loggedIn = true;
      return true
    }
    else {
      this.authService.loggedIn = false;
      return false;
    }
  }


  exit(){
    window.location.reload();
  }
}
