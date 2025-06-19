import { Observable } from 'rxjs';
import { UserAltaDto } from './../../../../../../../NEST/login_register/src/dto/UserAltaDto';
import { UserDatosDto } from './../../../../../../../NEST/login_register/src/dto/UserDatosDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = 'http://localhost:3000/users';

  user: any = null;

  constructor(private http: HttpClient) {}

  setUser(user: UserDatosDto): void {
    this.user = user;
  }

  getUser(): UserDatosDto | null {
    if(!this.user){
      return null;
    } else if (localStorage.getItem('usuario') === null) {
      return null;
    } else{
      this.user = JSON.parse(localStorage.getItem('usuario'));
      return this.user;
    }
  }
  removeUsuario():void{
    this.user = null;
  }
  findUser(email: string, password: string): Observable<UserDatosDto | null> {
    return this.http.get<UserDatosDto>(`${this.url}/findUser/${email},${password}`);
  }
}
