import { Injectable } from '@angular/core';
import { Facturacion } from 'src/app/model/Facturacion';
import { VariablesGlobalesBusqueda } from './variables-globales.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionesGlobales {
  factura: Facturacion = new Facturacion();
constructor(
  private gvariablesBus:VariablesGlobalesBusqueda
){

}



  // sacarSub() {
  //   for (var i = 0, element; (element = this.factura.Detalles[i++]); ) {
  //     if (element.fdt_iva == 0) {
  //       this.gvariablesBus.gsubtotal=element.fdt_sub
  //       this.gvariablesBus.gsubtotal0 =this.gvariablesBus.gsubtotal;
  //       console.log(this.gvariablesBus.gsubtotal0);
  //     } else {
  //       this.gvariablesBus.gsubtotal1 =
  //         this.gvariablesBus.gsubtotal0 + this.gvariablesBus.gsubtotal;
  //       console.log(this.gvariablesBus.gsubtotal1);
  //     }
  //   }
  //   return this.sacariva();
  // }
  // sacariva() {
  //   for (var i = 0, element; (element = this.factura.Detalles[i++]); ) {
  //     if (element.fdt_iva != 0) {
  //       this.gvariablesBus.g_iva = (this.gvariablesBus.gsubtotal1 * 12) / 100;
  //     }
  //     console.log('iva:', this.gvariablesBus.g_iva);
  //   }
  //   return this.sacartotal();
  // }
  // sacartotal() {
  //   this.gvariablesBus.g_total =
  //     this.gvariablesBus.gsubtotal0 +
  //     this.gvariablesBus.gsubtotal1 +
  //     this.gvariablesBus.g_iva +
  //     this.gvariablesBus.g_dec;
  //   console.log('total :', this.gvariablesBus.g_total);
  // }


  sacartotal(sub0:number,sub1:number) {

        this.gvariablesBus.gsubtotal0 = this.gvariablesBus.gsubtotal0 + sub0;
        this.gvariablesBus.gsubtotal1 = this.gvariablesBus.gsubtotal1 + sub1;
        this.gvariablesBus.g_iva = (this.gvariablesBus.gsubtotal1 * 12) / 100;

    this.gvariablesBus.g_total =
    this.gvariablesBus.gsubtotal0 +
    this.gvariablesBus.gsubtotal1 +
    this.gvariablesBus.g_iva +
    this.gvariablesBus.g_dec;
    return this.gvariablesBus.gsubtotal0, this.gvariablesBus.gsubtotal1,this.gvariablesBus.g_iva ,this.gvariablesBus.g_total
  }


}
