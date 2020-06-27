export class Area{
    constructor(
        public colegioId: number,
        public areaId: number,       
        public nombre: string,
        public estado: number,
        // public codEstadoNombre: string,
        public opcionDML: number,
        public opcionSelect: number,
        public descripcion_error: string              
    ){}
}
