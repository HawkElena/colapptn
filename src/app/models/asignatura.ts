export class Asignatura{
    constructor(
        //campos de la entidad
        public colegioId: number,
        public cursoId: number,
        public areaCnbId: number,
        public cursoNombre: string,
        public estadoId: number,        
        //Campos de las relaciones, para listar
        public areaCnbNombre: string,
        //Parámetros para indicar mnétodo a ejecutar en ws y sp
        public opcionDML: number,
        public opcionSelect: number,
        //campo para captura el error
        public error: string              
    ){}
}

