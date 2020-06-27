export class Empleado{
    constructor(
        public id: number,
        public colegioId: number,
        public nombre1: string,
        public nombre2: string,
        public apellido1: string,
        public apellido2: string,
        public cui: string,
        public nit: string,
        public telefono1: string,
        public telefono2: string,
        public direccion: string, 
        public email:  string,
        public fechaIngreso: string,
        public fechaModificacion: string,
        public empleadoJefeId: number, 
        public cargoId: number,
        public areaId: number,            
        public estadoId: number,        
        public municipioId: number,
        public fechaNacimiento: string,
        public img: string,
        public sueldo: number,       
        public genero: string,
        public esDocente : number,
        public esDocenteAux: boolean, // para recoger la data que biene del ws e ingresar su equivalente en enteros a esDocente         

        public opcionDML: number,        
        public opcionConsulta: number,
        public departamentoId: number,
        public paisId : number,      
        public estadoNombre: string,        
        public errorId : number,
        public error: string     

    ){}
}