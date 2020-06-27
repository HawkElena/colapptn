export class RepColVencidas{
    constructor(
        //parametros
        public colegioId        : number,
        public ciclo            : number, //para filtrar por ciclo
        public nivelId          : number, //para filtrar por nivel
        public carJorId         : number, // para ejecutar la funcion listar grado desde el select (ngModelChange)
        public jcgId            : number,
        public seccionId	    : number,  
        public opcionDML        : number,
        public opcionConsulta   : number,
        //modelo
        public alumnoId         : number, 
        public cicloConsultado  : number, //asi retorna de la bd                  
        public alumnoNombres    : string,
        public carreraNombre    : string,
        public jornadaNombre    : string,
        public gradoNombre      : string,
        public seccionNombre    : string,
        public ultimoMesPagado  : number,
        public montoxMes        : number,
        public moraxMes         : number,
        public descuentoxMes    : number,
        public fechadeReporte   : string,
        public totalDeuda       : number,       
        public cuotasVencidas   : number
    ){}
}