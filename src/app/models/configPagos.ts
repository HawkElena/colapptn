export class ConfigPagos{
    constructor(
        public colegioId        : number,
        public pagoConfigId     : number,
        public ciclo            : number,
        public carreraNombre    : string,
        public monto            : number,
        public diaLimite        : number,
        public fechaModificacion: string,
        public tipoPagoId       : number,
        public jcId             : number,
        public estadoId         : number,
        public estadoNombre     : string,
        public fechaIngreso     : string,
        public opcionDML        : number,
        public opcionConsulta   : number,
        public mensajeId        : number,
        public mensajeNombre    : string,    
        public pagina           : number,
        public registrosPorPagina : number,  
        public jornadaId        :  number,
        public jornadaNombre    : string,
        public tipoPagoNombre   : string,
        public nivelId          : number,
        public mora             : number
    ){}
}
 