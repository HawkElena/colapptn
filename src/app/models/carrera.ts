export class Carrera{
    constructor(
        public colegioId: number,
        public carreraId: number,
        public nivelId: number,
        public carreraNombre: string,
        public estado: number,
        // public codEstadoNombre: string,
        public opcionDML: number,
        public opcionSelect: number,
        public error: string              
    ){}
}
