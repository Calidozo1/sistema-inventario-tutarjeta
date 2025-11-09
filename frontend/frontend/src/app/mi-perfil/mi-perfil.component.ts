import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './mi-perfil.html',
  styleUrls: ['./mi-perfil.css']
})
export class MiPerfilComponent {
  perfil: any = JSON.parse(localStorage.getItem('perfilActivo') || '{}');
}
