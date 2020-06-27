export class Ciclo{
    constructor(
        public colegioId        : number,
        public cicloId          : number,
        public anio             : number,
        public cicloNombre      : string,
        public estado           : number,
        public codEstadoNombre  : string,
        public opcionDML        : number,
        public opcionSelect     : number,
        public error            : string, 
        public habilitadoParaIncripcion: number              
    ){}
}
