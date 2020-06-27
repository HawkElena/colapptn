import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

//componentes
import { CarreraJornadaGradoComponent } from './components/carrera-jornada-grado.component';
import { AlumnoComponent } from './components/alumno.component';

import { ModalConfirm } from './modal/modalConfirm.component';
import {ToastComponet} from './toast/toast.component';
import {BuscarAlumno} from './busquedas/buscarAlumno.component'


//servicios
import { EstadoService } from './services/estado.service';
import { CicloService } from './services/ciclo.service';
import { NivelService } from './services/nivel.service';
import { CarreraService } from './services/carrera.service';
import { CarreraJornadaService } from './services/carreraJornada.service';
import { TipoJornadaService } from './services/tipoJornada.service';
import { CarJorGraService } from './services/carJorGra.service';
import { GradoService } from './services/grado.service';
import { RegistroAlumnoSevice } from './services/registroAlumno.service';
import { GeneroSevice } from './services/genero.service';
import { NacionalidadSevice } from './services/nacionalidad.seervice';
import { PaisService } from './services/pais.service';
import { DepartamentoService } from './services/departamento.service';
import { MunicipioService } from './services/municipio.service';
import { EncargadoService } from './services/encargado.service';
import { AlumnoxEncargadoService } from './services/alumnoxEncargado.service';
import { InscripcionService } from './services/inscripcion.service';
import { ConfigPagoService } from './services/configPago.service';
import { TipoPagoService } from './services/tipoPago.service';
import { PagoService } from './services/pago.service';
import { FormaPagoService } from './services/formaPago.service';
import { BancoService } from './services/banco.service';
import { ClienteService } from './services/cliente.service';
import { PrerrequisitoService } from './services/prerrequisito.service';
import { RepColVencidasService } from './services/repColegiaturasVencidas.service';
//23/05/2020
import { AreaService } from './services/area.service';
import { EmpleadoService } from './services/empleado.service';
import { AreaCnbService } from './services/areaCnb.service';

// import { UserService } from './services/user.service';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Hawk_test_service } from './services/hawk_test.service';
import { HttpClientModule} from '@angular/common/http';
import {BuscarAlumnoService} from './busquedas/buscarAlumno.service';

import {  HTTP_INTERCEPTORS } from '@angular/common/http';
// import{TokenInterceptorService} from ''
import { from } from 'rxjs';
// import { TokenInterceptorService } from './token-interceptor.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};




@NgModule({
  declarations: [
    AppComponent
    //componentes para el menu
    ,SidebarComponent
    ,CarreraJornadaGradoComponent
    ,AlumnoComponent
    ,BuscarAlumno
    ,ToastComponet
    ,ModalConfirm
    ,routingComponents

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    //para el menu side bar
    ,BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule
    ,NgbModule
    ,FormsModule
    ,HttpClientModule
    ,ReactiveFormsModule
  ],
  providers: [{
    //para el menu side bar
    provide: PERFECT_SCROLLBAR_CONFIG
    ,useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }
  // ,{
  //   provide:HTTP_INTERCEPTORS
  //   ,useClass:TokenInterceptorService
  //   ,multi:true
  // }
  ,

  //servicios de alumnos
  EstadoService,
  CicloService,
  NivelService,
  CarreraService,
  CarreraJornadaService,
  TipoJornadaService,
  CarJorGraService,
  GradoService,
  RegistroAlumnoSevice,
  GeneroSevice,
  NacionalidadSevice,
  PaisService,
  DepartamentoService,
  MunicipioService,
  EncargadoService,
  AlumnoxEncargadoService,
  InscripcionService,
  ConfigPagoService,
  TipoPagoService,
  PagoService,
  FormaPagoService,
  BancoService,
  ClienteService,
  PrerrequisitoService,
  RepColVencidasService,
  Hawk_test_service
  ,BuscarAlumnoService
  ,AreaService
  ,EmpleadoService
  ,AreaCnbService

 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
