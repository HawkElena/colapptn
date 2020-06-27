import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

//compoentes
import { LoginComponent } from './autenticacion/login.component';
import { AdminComponent } from './admin/admin.component';
import { InscripcionComponent } from './components/inscripcion.component';
import { PerfilAlumnoComponent } from './components/alumno-perfil.component';
import { HomeComponent } from './components/home.component';
import { ConfigMasterComponent } from './components/config-master.component';
import { PagoComponent } from './components/pago.component';
import { EncargadoComponent } from './components/encargado.component';

import { CicloComponent } from './components/ciclo.component';
import { NivelComponent } from './components/nivel.component';
import { CarreraComponent } from './components/carrera.component';
import { ConfigPagosComponent } from './components/config-pagos.component';
import { EstadoComponent } from './components/estado.component';
import { CarreraJornadaComponent } from './components/carrera-jornada.component';
import { ReporteColegiaturaVencidaComponent } from './components/rep-colgeiaturas-vencidas.component';
import { ReporteInscritosComponent } from './components/reporte-inscritos.component';
import { ReporteComponent } from './components/reporte.component';
import {HawkTestComponent} from './components/hawk_test.component'
//23/05/2020
import { AreaComponent } from './components/area.component';
import { EmpleadoComponent } from './components/empleado.component';
import { PerfilEmpleadoComponent } from './components/empleado-perfil.component';
import { AreaCnbComponent } from './components/area-cnb.component';



// const accountModule = () => import('./autenticacion/account.module').then(x => x.AccountModule);
// const usersModule = () => import('./users/users.module').then(x => x.UsersModule);


const routes: Routes = [
   {path: '', component: HomeComponent,canActivate:[AuthGuard] }
  ,{ path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
  ,{path: 'inscripcion', component: InscripcionComponent ,canActivate: [AuthGuard]}
  ,{path: 'inscripcion/:id', component: InscripcionComponent ,canActivate: [AuthGuard]}
  ,{path: 'perfilAlumno', component: PerfilAlumnoComponent ,canActivate: [AuthGuard]}
  ,{path: 'home', component: HomeComponent,canActivate:[AuthGuard] }
  ,{path: 'configuracion', component: ConfigMasterComponent,canActivate:[AuthGuard] }
  ,{path: 'pago', component: PagoComponent,canActivate:[AuthGuard] }
  ,{path: 'encargado', component: EncargadoComponent,canActivate:[AuthGuard] }
  ,{path: 'perfilEmpleado',  component: PerfilEmpleadoComponent, canActivate:[AuthGuard]}
  ,{ path: '**', redirectTo: 'home' }

    // {path: 'configuracion', component: ConfigMasterComponent },
    // {path: 'perfilAlumno', component: PerfilAlumnoComponent },
    // {path: 'encargado/:id', component: EncargadoComponent },
    // ,{path: 'inscripcion/:id', component: InscripcionComponent ,canActivate: [AuthGuard]}
    // {path: 'pago', component: PagoComponent },
    // {path: 'reporte', component: ReporteComponent },
    // {path: 'login', component: LoginComponent },
    // // {path: '', component: HomeComponent },
    // { path: '**', component:HomeComponent},
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    // { path: 'account', loadChildren: accountModule },
    //   // otherwise redirect to home
    // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
                                  LoginComponent
                                  ,AdminComponent
                                  ,InscripcionComponent
                                  ,PerfilAlumnoComponent
                                  ,HomeComponent
                                  ,ConfigMasterComponent
                                  ,PagoComponent
                                  ,EncargadoComponent

                                  ,EstadoComponent
                                  ,CicloComponent
                                  ,NivelComponent
                                  ,CarreraComponent
                                  ,CarreraJornadaComponent
                                  ,ConfigPagosComponent
                                  ,EstadoComponent
                                  ,CarreraJornadaComponent
                                  ,ReporteComponent
                                  ,ReporteColegiaturaVencidaComponent
                                  ,ReporteInscritosComponent
                                  ,HawkTestComponent
                                  ,AreaComponent
                                  ,EmpleadoComponent
                                  ,PerfilEmpleadoComponent
                                  ,AreaCnbComponent   
                                ]
