import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NivelService } from '../services/nivel.service';
import { Nivel2 } from '../models/nivel2';
import { RepColVencidasService } from '../services/repColegiaturasVencidas.service';
import { RepColVencidas } from '../models/reporteColVencidas';
import { CarreraJornadaService } from '../services/carreraJornada.service';
import { CarreraJornada } from '../models/carrerajornada';
import { CarJorGraService } from '../services/carJorGra.service';
import { CarreraJornadaGrado } from '../models/carreraJornadaGrado';

import { NgForm } from '@angular/forms';
import * as jsPDF from 'jspdf';
// import { element } from 'protractor';
// import { StringifyOptions } from 'querystring';
// declare var jsPDF: any;

@Component({
    selector: 'rep-inscritos',
    templateUrl: '../views/reporte-inscritos.html',
    providers: [NivelService, RepColVencidasService, CarreraJornadaService,CarJorGraService]
})

export class ReporteInscritosComponent implements OnInit{
    public titulo: string;
    @ViewChild('content', {static: false}) content: ElementRef;

    public niveles2: Nivel2;
    public carreraJornadas      : CarreraJornada;
    public carreraJornadaGrados : CarreraJornadaGrado;
    public repColVencidass      : RepColVencidas;
    public bandera              : number;
    public encabezadoReporte    : string;


    constructor(private httpClient:HttpClient,
        private _route                  : ActivatedRoute,
        private _router                 : Router,
        public nivelService             : NivelService,
        public repColVencidasService    : RepColVencidasService,
        public carreraJornadaService    : CarreraJornadaService,
        public carJorGraService         : CarJorGraService,

    ){
        this.titulo = 'Ver alumnos isncritos';
        this.niveles2 = new Nivel2(0,0,'',0,0,0,'');
        this.carreraJornadas = new CarreraJornada(0,0,0,0,0,'','',0,'',0,'');
        this.carreraJornadaGrados = new CarreraJornadaGrado(0,0,0,0,0,0,'',0,0,'','','','',0,0,0,0);
        this.repColVencidass = new RepColVencidas(0,0,0,0,0,0,0,0,0,0,'','','','','',0,0,0,0,'',0,0);
        this.bandera = 0;
        // this.f1 = 0;
        // this.f2 = 0;
        // this.fechaFormateada =[];
    }
    ngOnInit(){
        console.log('Se ha cargado el componente reporte.component.ts');
        this.listarNivel();
        this.limpiarForm();
    }

    limpiarForm(form?: NgForm) {
        if (form != null)
          form.reset();
        this.repColVencidasService.repColVencidasSeleccionado = {
           colegioId        : null,
             ciclo            : null, //para filtrar por ciclo
             nivelId          : null, //para filtrar por nivel
             carJorId         : null,
             jcgId            : null,
             seccionId	      : null,
             opcionDML        : null,
             opcionConsulta   : null,
            //modelo
             alumnoId         : null,
             cicloConsultado  : null, //asi retorna de la bd
             alumnoNombres    : '',
             carreraNombre    : '',
             jornadaNombre    : '',
             gradoNombre      : '',
             seccionNombre    : '',
             ultimoMesPagado  : null,
             montoxMes        : null,
             moraxMes         : null,
             descuentoxMes    : null,
             fechadeReporte   : '',
             totalDeuda       : null,
             cuotasVencidas   : null
        }
    }

    listarNivel(){
        this.nivelService.getNivelList(this.niveles2).subscribe(
            response => {
                this.nivelService.nivelList = response.mNivelResult;
                console.log(this.nivelService.nivelList);
            },
            error => {
                console.log(<any>error);
                alert('Error... ' + <any>error);
            }
        );
    }

    listarCarreraJornada(nivel: any) {
        /**Le asignamos el valor del nivelId al json que enviamos al servicio */
        if (nivel != null) {
            this.carreraJornadas.nivelId = nivel;
            this.carreraJornadaService.getCarJornadaList(this.carreraJornadas).subscribe(
                response => {
                    this.carreraJornadaService.carJorList = response.mCarreraJornadaResult;
                    // console.log(this.carreraJornadaService.carJorList);
                },
                error => {
                    console.log(<any>error);
                    alert('Error... ' + <any>error);
                }
            );
        }
    }
    /**Se ejecuta desde el select llamado Carrera */
    listarCarreraJoranaGrado(carJorId: any) {
        console.log('ha llamado el grado....');
        if (carJorId != null) {
            this.carreraJornadaGrados.carJorId = carJorId;
            this.carreraJornadaGrados.opcionConsulta = 1;
            this.carJorGraService.getCarJornadaGradoList(this.carreraJornadaGrados).subscribe(
                response => {
                    this.carJorGraService.carJorGraList = response.mCarrera_Jor_GraResult
                    console.log(this.carJorGraService.carJorGraList);
                },
                error => {
                    console.log(<any>error);
                    alert('Error... ' + <any>error);
                }
            );
        }
    }

    crearReporteSolvencias(jcgId_ : number, opcConsulta : number) {
        /**Le asignamos el valor del nivelId al json que enviamos al servicio */
        if (jcgId_!= null) {
            this.repColVencidass.colegioId      = 3;
            this.repColVencidass.ciclo          = 0;//en la base de datos se obtiene el ciclo activo
            this.repColVencidass.seccionId      = 0;
            this.repColVencidass.opcionDML      = 1;
            this.repColVencidass.opcionConsulta = 2; //opcConsulta;
            this.repColVencidass.jcgId          = jcgId_;
            this.repColVencidasService.postRepColVencidas(this.repColVencidass).subscribe(
                response => {
                    this.repColVencidasService.repColVencidasList = response.mReportesPagosResult;
                        this.repColVencidasService.repColVencidasList.forEach(element =>{
                        this.encabezadoReporte = element.gradoNombre +' '+ element.carreraNombre +', '+ element.jornadaNombre;
                        this.repColVencidasService.repColVencidasSeleccionado.fechadeReporte = element.fechadeReporte;
                        this.repColVencidasService.repColVencidasSeleccionado.cicloConsultado = element.cicloConsultado;
                    })
                },
                error => {
                    console.log(<any>error);
                    alert('Error... ' + <any>error);
                }
            );
        }
    }
    imprimirPDF(){
        let doc = new jsPDF();
        let specialElementHandlers = {
            '#editor': function(element, renderer){
                return true;
            }
        };

        let content = this.content.nativeElement;
        doc.fromHTML(content.innerHTML, 10, 10, {
            'width': 90,
            'elementHandlers': specialElementHandlers
        });

        doc.save('test.pdf');
    }

   ejecutarCtrlP(){
    window.print();
   }


        mostrarFormulario(ban : number){
            this.bandera = ban;
        }



}
