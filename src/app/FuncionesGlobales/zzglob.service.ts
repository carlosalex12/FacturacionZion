import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ZzglobService {

  metodo={
    Select:"/Select?p_Usr=",
    Insert:"/Insertar?p_Usr=",
    Update:"/Actualizar?p_Usr=",
    Existencia:'/ExistenciaArticulo?p_Art=',
    Delete:"/BuscarArticulos?p_Art=A10&p_Usr="
  }
  //obj:any
  server="https://localhost:7232/"
  constructor() { }

  mensaje(picon:any,ptitle:any){
    Swal.fire({
      position: 'top',
      icon:  picon,
      title: ptitle,
      showConfirmButton: false,
      timer: 1500,
    });

  }
  mensaje1(picon:any,ptitle:any){
    Swal.fire({
      icon: picon,
      title: 'Oops...',
      text: ptitle,
    })
  }
  creaurl(tabla:any,metodo:any){
    return this.server+tabla+metodo
  }
// creaobj(modelo:any){
//   alert('entro ')
//   for (const property in modelo) {
//     //console.log(`${property}:${modelo[property]}`);
//     this.obj={
//     property:modelo
//    }
// console.log("objjj",this.obj);


//   }


// }



}
