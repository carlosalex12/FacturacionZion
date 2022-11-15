import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Facturacion } from '../../model/Facturacion';
import { GlobalService } from '../../services/GserviceGPPD';
import { MatDialogRef } from '@angular/material/dialog';
import { VariablesFacturacion } from '../service/Variables-Facturacion';
@Component({
  selector: 'app-cliente-dialogo',
  templateUrl: './cliente-dialogo.component.html',
  styleUrls: ['./cliente-dialogo.component.css'],
})
export class ClienteDialogoComponent implements OnInit {
  l_BusCientes: any;
  l_cli_est = '';
  l_ci_cat = '';
  l_cli_dato = '';
  l_cli_nom = '';
  l_idu = '';
  factura: Facturacion = new Facturacion();

  constructor(
    public dialoRef: MatDialogRef<ClienteDialogoComponent>,
    private GlobalService: GlobalService,
    private gvariablesBus: VariablesFacturacion
  ) {}

  ngOnInit(): void {
    var param='p_Emp='+
    this.gvariablesBus.g_IdEmp
    +'&p_Valor=' +
    this.gvariablesBus.g_cli_dato
    +'&p_Campo=' +
    this.gvariablesBus.g_cli_tid
    +'&p_Usr=' +
    this.gvariablesBus.g_idU
    this.GlobalService.metodoGet(
      'https://localhost:7232/Cliente/BuscarCliente?'+param
    ).subscribe((res: any) => {
      this.l_BusCientes = res.result;
      console.log(this.l_BusCientes);
    });
  }
  cliSelect(datosCli: any) {
    this.gvariablesBus.g_DatosCli = {
      emp_cod: datosCli.emp_cod,
      cli_cod: datosCli.cli_cod,
      cli_nom: datosCli.cli_nom,
      cli_est: datosCli.cli_est,
      cli_nid: datosCli.cli_nid,
      cli_tid: datosCli.cli_tid,
      cli_dir: datosCli.cli_dir,
      cli_tlf1: datosCli.cli_tlf1,
      cli_tlf2: datosCli.cli_tlf2,
      cli_email: datosCli.cli_email,
    };
    console.log(this.gvariablesBus.g_DatosCli);
    this.dialoRef.close();
  }
}
