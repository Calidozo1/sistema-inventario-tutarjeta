import { Component } from '@angular/core';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  standalone: true,
  imports: []
})
export class MiPerfilComponent {
  perfil: any = JSON.parse(localStorage.getItem('perfilActivo') || '{}');
}
