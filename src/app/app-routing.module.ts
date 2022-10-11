import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/auth/login/login.component';
import { EmpleadosComponent } from './componentes/empleados/empleados.component';
import { StampingComponent } from './componentes/forms/stamping/stamping.component';
import { PanelComponent } from './componentes/panel/panel.component';
import { RolesGuard } from './componentes/auth/roles.guard';
import { AlmacenComponent } from './componentes/forms/almacen/almacen.component';
import { SettingsComponent } from './componentes/ajustes/settings.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'empleados', component: EmpleadosComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador']}},
  {path:'forms', component: StampingComponent},
  {path:'panel', component: PanelComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador']}},
  {path:'configuracion', component: SettingsComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador']}},
  {path:'prueba', component: AlmacenComponent},
  {path:'**', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
