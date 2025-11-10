import { Component } from '@angular/core';
import {LoginComponent} from './login/login.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    LoginComponent,
    RouterOutlet
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
