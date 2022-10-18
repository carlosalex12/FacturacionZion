import { Component, OnInit,Input } from '@angular/core';
import { Facturacion } from '../../model/Facturacion';
import { GlobalService } from '../../services/GserviceGPPD';
import { VariablesGlobalesBusqueda } from '../variables-globales.service';

@Component({
  selector: 'app-cliente-dialogo',
  templateUrl: './cliente-dialogo.component.html',
  styleUrls: ['./cliente-dialogo.component.css']
})
export class ClienteDialogoComponent implements OnInit {
  l_BusCientes:any
  l_estCli=""
  l_catCli=""
  l_clicod=""
  l_clinom=""
  l_idu=""
  factura:Facturacion = new Facturacion();

  constructor(

    private GlobalService:GlobalService,
    private gvariablesBus:VariablesGlobalesBusqueda,
  ) { }

  ngOnInit(): void {
this.l_clicod=this.gvariablesBus.g_clicod
this.l_clinom=this.gvariablesBus.g_clinom
this.l_idu=this.gvariablesBus.g_idU

this.GlobalService

.metodoGet(`https://localhost:44381/Cliente/GetId?p_id=`+this.l_clicod+`&p_nom=`+this.l_clinom+`&p_usr=`+this.l_idu)
.subscribe((res:any) => {
  this.l_BusCientes=res;
  console.log(this.l_BusCientes);
  this.l_clinom=this.l_BusCientes[0].cli_nom
  this.l_clinom=this.l_BusCientes[0].cli_nom
  this.l_estCli=this.l_BusCientes[0].cli_est
  this.l_catCli=this.l_BusCientes[0].ccl_cod
  console.log(this.l_BusCientes)
});



  }
cliSelect(datosCli:any){
console.log(datosCli)
this.gvariablesBus.g_DatosCli={
//emp_cod
//cli_cod
//cli_nom
//cli_est
//ccl_cod

}



}










}
