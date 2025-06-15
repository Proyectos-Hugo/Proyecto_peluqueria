
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { RouterModule, Router } from '@angular/router';
import { ClienteDatosDto } from '../../model/ClienteDatosDto';


@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email:string;
  password:string;

  constructor(private log :LoginService, private router: Router){}

  login(){
    this.log.findUsu(this.email,this.password).subscribe(data => {
      console.log(data)
    })

  }
    goToRegister() {
    this.router.navigate(['/auth/register']);
  }

}
