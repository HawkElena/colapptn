export class Inscripcion{
    constructor(
        public asignacionId     : number,
        public colegioId        : number,
        public fechaIngreso     : string,  
        public descuento        : number, 
        public alumnoId         : number,
        public estadoId         : number,
        public estadoNombre     : string,
        public esNuevo          : number,
        public aParvulos1       : number,
        public descripcion      : string,
        public usuarioAutoriza  : number,
        public seccionId        : number,
        public ciclo             : number,
        public jcgId            : number,
        public aprobado         : number,
        public confirmada       : number,
        public reservada        : number,
        public opcionDML        : number,
        public opcionSelect     : number,
        /*-----------DATOS DE LECTURA------------ */
        public nivelId          : number,
        public carJorId         : number,
        public nivelNombre      : string,
        public carreraNombre    : string,
        public jornadaNombre    : string,
        public gradoNombre      : string,
        public seccionNombre    : string,
        public mensajeId        : number,
        public mensajeNombre    : string           
    ){}
}