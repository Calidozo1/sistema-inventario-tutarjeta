import { RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],  // ← Agregar RouterOutlet
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'sistema-inventario-tutarjeta';
}
