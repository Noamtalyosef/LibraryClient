import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router : Router) { }

  onSubmit() {
    
    if (this.email == "1234" && this.password == "1234")
    {
      localStorage.setItem('user',JSON.stringify({email: this.email}))
      this.router.navigate(["/books"])
    }
    else{
      alert("invalid email or password")
      this.email= '';
      this.password = '';
    }
  }
}
