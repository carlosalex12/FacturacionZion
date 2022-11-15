import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { VariablesFacturacion } from '../facturacion/service/Variables-Facturacion';
import { VariablesGlobalesService } from '../menu/serviceMenu/variables-globales.service';
import { GlobalService } from '../services/GserviceGPPD';
import * as printJS from 'print-js';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent implements OnInit {
  l_BuscaDetslleFact:any
  l_facfec:any
  constructor(
    public dialoRef:MatDialogRef<DetalleFacturaComponent>,
    private GlobalService:GlobalService,
    public gvariable: VariablesGlobalesService,
    public gvbus:VariablesFacturacion
  ) { }

  ngOnInit(): void {
    console.log(this.gvbus.g_fac_doc);
    let fec =new DatePipe('en-US');
this.l_facfec=fec.transform(Date.now(), 'yyyy/MM/dd');
    this.GlobalService

    .metodoGet(`https://localhost:7232/Detalle/BuscarFacDetalle?p_Doc=`+this.gvbus.g_fac_doc+`&p_Num=`+this.gvbus.g_fac_num+`&p_Usr=`+this.gvariable.g_empid.id.id)
    .subscribe((res:any) => {
      console.log(res);

      this.l_BuscaDetslleFact=res.result;
     // console.log(this.l_BuscaDetslleFact)
    });
  }
  cliSelect(item:any){

  }
  cerrar(){
    this.dialoRef.close();
  }
  imprimir(){

    printJS('/.assets/2.pdf')
  }
}
