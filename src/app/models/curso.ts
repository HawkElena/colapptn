export class Curso{
    constructor(
        public colegioId: number,
        public id: number,        
        public cursoNombre: string,
        public estado: number,
        
        //-------------------------
        public opcionDML: number,
        public opcionSelect: number,
        public error: string              
    ){}
}
