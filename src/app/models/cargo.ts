export class Cargo{
    constructor(
        public colegioId: number,
        public cargoId: number,       
        public nombre: string,
        public estado: number,
        public estadoNombre: string,
        public opcionDML: number,
        public opcionSelect: number,
        public descripcion_error: string              
    ){}
}
