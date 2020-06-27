export class AreaCnb{
    constructor(
        public colegioId: number,
        public areaCnbId: number,        
        public areaCnbNombre: string,
        public estadoId: number,
        
        //-------------------------
        public opcionDML: number,
        public opcionSelect: number,
        public error: string              
    ){}
}
