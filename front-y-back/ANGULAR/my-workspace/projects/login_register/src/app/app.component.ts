import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styles:[`
    nav {
      background-color: #f8f9fa;
      padding: 1rem;
      border-bottom: 1px solid #dee2e6;
    }
    nav ul {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    nav li {
      margin-left: 1rem;
    }
    nav a {
      text-decoration: none;
      color: #007bff;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background 0.2s;
    }
    nav a.active,
    nav a:hover {
      font-weight: bold;
      color: #0056b3;
      background-color: #e2e6ea;
    }
  `]
})
export class AppComponent {
    isLoggedIn(): boolean {
    return !!localStorage.getItem('usuario');
  }

}
