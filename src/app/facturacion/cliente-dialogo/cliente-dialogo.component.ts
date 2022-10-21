import { Component, OnInit,Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Facturacion } from '../../model/Facturacion';
import { GlobalService } from '../../services/GserviceGPPD';
import { MatDialogRef } from '@angular/material/dialog';
import { VariablesGlobalesBusqueda } from '../service/variables-globales.service';
@Component({
  selector: 'app-cliente-dialogo',
  templateUrl: './cliente-dialogo.component.html',
  styleUrls: ['./cliente-dialogo.component.css']
})
export class ClienteDialogoComponent implements OnInit {
  l_BusCientes:any
  l_cli_est=""
  l_ci_cat=""
  l_cli_cod=""
  l_cli_nom=""
  l_idu=""
  factura:Facturacion = new Facturacion();

  constructor(
    public dialoRef:MatDialogRef<ClienteDialogoComponent>,
    private GlobalService:GlobalService,
    private gvariablesBus:VariablesGlobalesBusqueda,
  ) { }

  ngOnInit(): void {

this.l_cli_cod=this.gvariablesBus.g_clicod
this.l_cli_nom=this.gvariablesBus.g_clinom
this.l_idu=this.gvariablesBus.g_idU

this.GlobalService

.metodoGet(`https://localhost:44381/Cliente/GetId?p_id=`+this.l_cli_cod+`&p_nom=`+this.l_cli_nom+`&p_usr=`+this.l_idu)
.subscribe((res:any) => {
  this.l_BusCientes=res;
  console.log(this.l_BusCientes)
});



  }
cliSelect(datosCli:any){
//console.log(datosCli)
this.gvariablesBus.g_DatosCli={
emp_cod:datosCli.emp_cod,
cli_cod:datosCli.cli_cod,
cli_nom:datosCli.cli_nom,
cli_est:datosCli.cli_est,
ccl_cod:datosCli.ccl_cod

}

console.log(this.gvariablesBus.g_DatosCli)
this.dialoRef.close();

}










}
