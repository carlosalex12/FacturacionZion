import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ZzglobService } from './zzglob.service';
@Injectable({
  providedIn: 'root',
})
export class ZzapplService {
  valor: any;
  campo: any;
  tagreq: any;
  atrib: any;
  constructor(
  private zzglob:ZzglobService
  ) {}

  gGuardar(documen: any): any {
    //alert('gGuardar');
    if (this.gValidarVacios() == false) {return false}
   if(documen.lAntesGuardar()==false){return false}
   return true
  }

  gNuevo() {
    //alert('gNuevo');
  }

  gValidarVacios(): any {
    //alert('validar vacios');
    var elem = document.querySelectorAll('#idbody input');
    //console.log(elem);

    for (let i = 0; i < elem.length; i++) {
      const campo = elem[i];
      this.atrib = campo.attributes;
      this.tagreq = this.atrib.tag.value.substr(2, 1);
      this.valor = document.getElementById(elem[i].id);
      if (this.tagreq == 'r' &&(this.valor.value == null || this.valor.value == '')
      ) {
        this.zzglob.mensaje1('info','EL CAMPO('+this.valor.name+'), NO PUEDE ESTAR VACIO')
        return false;
      }
    }
    return true;
  }
}
