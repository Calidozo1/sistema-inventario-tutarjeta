import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar componentes standalone
import { TarjetasListComponent } from './tarjetas/tarjetas-list/tarjetas-list.component';
import { TarjetasFormComponent } from './tarjetas/tarjetas-form/tarjetas-form.component';
import { VentasListComponent } from './ventas/ventas-list/ventas-list.component';
import { VentasFormComponent } from './ventas/ventas-form/ventas-form.component';

const routes: Routes = [
  { path: 'tarjetas', component: TarjetasListComponent },
  { path: 'tarjetas/nueva', component: TarjetasFormComponent },
  { path: 'ventas', component: VentasListComponent },
  { path: 'ventas/nueva', component: VentasFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
