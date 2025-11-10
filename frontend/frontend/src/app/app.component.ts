import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet, /*RouterLink, RouterLinkActive */} from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistrarIncidenciaComponent } from './registrar-incidencia/registrar-incidencia.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'frontend';
}


