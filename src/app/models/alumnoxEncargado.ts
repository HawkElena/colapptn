export class AlumnoxEncargado{
    constructor(
        public colegioId: number,
        public alumnoId: number,
        public encargadoId: number,
        public estadoId: number,
        public estadoNombre: string,
        public opcionDML: number,
        public tipoConsulta: number,
        public errorNombre: string,               
    ){}
}
