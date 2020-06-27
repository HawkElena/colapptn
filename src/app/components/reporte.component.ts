import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NivelService } from '../services/nivel.service';
import { Nivel2 } from '../models/nivel2';

// import { Nivel2 } from '../models/nivel2';
// import { NgForm } from '@angular/forms';
//combos

// import { FlashMessageService } from 'angular2-flash-message';
// import { ToastrService } from 'ngx-toastr'

declare var jsPDF: any;
@Component({
    selector: 'reporte',
    templateUrl: '../views/reporte.html',
    providers: [NivelService]
})

export class ReporteComponent implements OnInit{
    public titulo: string;
    @ViewChild('content', {static: false}) content: ElementRef;

    /* Nieles2 es un json que se crea alternativamente para mandarlo como parametro en la funcion listar niveles, porque asi lo requiere el servicio */
    public niveles2: Nivel2;
    public bandera : number;

    /* se declara este objeto porque se debe pasar un json como parametro al servicio estado */
    // estados: Estado;

    constructor(private httpClient:HttpClient,
        private _route: ActivatedRoute,
        private _router: Router,
        public nivelService: NivelService,
    ){
        this.titulo = 'Sección de reportes';
        // this.nivelService.nivelSeleccionado = new Nivel2(null,null,'',null,null,null,'');
        //inicializamos el modelo
        this.niveles2 = new Nivel2(0,0,'',0,0,0,'');
        this.bandera = 0;
    }

    listarNivel(){
        this.nivelService.getNivelList(this.niveles2).subscribe(
            response => {
                //alert('buscar nivel')
                this.nivelService.nivelList = response.mNivelResult;
                // this._router.navigate(["/buscar-nivel"]);
                console.log(this.nivelService.nivelList);
            },
            error => {
                console.log(<any>error);
                alert('Error... ' + <any>error);
            }
        );
    }

    imprimirPDF(){
        let doc = new jsPDF();
        let specialElementHandlers = {
            '#editor': function(element, renderer){
                return true;
            }
        };

        let content = this.content.nativeElement;
        doc.fromHTML(content.innerHTML, 15, 15, {
            'width': 90,
            'elementHandlers': specialElementHandlers
        });

        doc.save('test.pdf');
    }

    ngOnInit(){
        console.log('Se ha cargado el componente reporte.component.ts');
        this.listarNivel();
    }

    //-----------------------------------------------crear pdf dinamico-----------------------------------------
    // columns = [
    //     {title: "ID", dataKey: "id"},
    //     {title: "Name", dataKey: "name"},
    //     {title: "Country", dataKey: "country"}
    // ];

    // rows = [
    //     {"id": 1, "name": "Shaw", "country": "Tanzania"},
    //     {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
    //     {"id": 3, "name": "Garcia", "country": "Madagascar"},
    // ];


    // downloadPDF() {
    //     console.log('donloadPDF');
    //     console.log(this.nivelService.nivelList);
    //     let columns = ["ID", "Name", "Country"];
    //     let rows = [
    //         [1, "Shaw", "Tanzania"],
    //         [2, "Nelson", "Kazakhstan"],
    //         [3, "Garcia", "Madagascar"],
    //         [4, "Luis", "Peten"],
    //     ];

    //     let doc = new jsPDF('l', 'pt');
    //     doc.autoTable(columns, this.nivelService.nivelList); // typescript compile time error
    //     doc.save('table.pdf');
    //     }

    //     mostrarFormulario(ban : number){
    //         this.bandera = ban;
    //     }


    // limpiarForm(form?: NgForm){
    //     if(form != null)
    //     form.reset();
    //     this.nivelService.nivelSeleccionado= {
    //         colegioId : 3,
    //         nivelId : null,
    //         nivelNombre : '',
    //         estado: null,
    //         opcionDML: null,
    //         opcionSelect: null,
    //         error: ''
    //     }
    // }

    // onSubmit(form: NgForm) {

    // }


    // listarNivel(){
    //     this.nivelService.getNivelList(this.niveles2).subscribe(
    //         response => {
    //             //alert('buscar nivel')
    //             this.nivelService.nivelList = response.mNivelResult;
    //             // this._router.navigate(["/buscar-nivel"]);
    //         },
    //         error => {
    //             console.log(<any>error);
    //             alert('Error... ' + <any>error);
    //         }
    //     );
    // }

    // showForEdit(niv : Nivel2){
    //      this.nivelService.nivelSeleccionado = Object.assign({}, niv);
    // }



}
