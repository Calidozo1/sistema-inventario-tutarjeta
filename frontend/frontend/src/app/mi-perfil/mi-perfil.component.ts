import { Component, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './mi-perfil.html',
  styleUrls: ['./mi-perfil.css']
})
export class MiPerfilComponent implements OnDestroy {
  perfil: any = null;
  private sub: Subscription | null = null;

  constructor(private authService: AuthService) {
    this.sub = this.authService.perfil$().subscribe(p => this.perfil = p);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
