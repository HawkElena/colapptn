export class TipoJornada{
    constructor(
        public colegioId: number,
        public jornadaId: number,
        public jornadaNombre: string,
        public estado: number,
        public opcionDML: number,
        public error: string             
    ){}
}