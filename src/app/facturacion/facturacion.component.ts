import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { __values } from 'tslib';
import { VariablesGlobalesService } from '../menu/serviceMenu/variables-globales.service';
import { Facturacion } from '../model/Facturacion';
import { GlobalService } from '../services/GserviceGPPD';
import { MatDialog } from '@angular/material/dialog';
import { ClienteDialogoComponent } from './cliente-dialogo/cliente-dialogo.component';
import { VariablesFacturacion } from './service/Variables-Facturacion';
import { ArticuloDialogoComponent } from './articulo-dialogo/articulo-dialogo.component';
import Swal from 'sweetalert2';
import { ZzglobService } from '../FuncionesGlobales/zzglob.service';
import { ZzapplService } from '../FuncionesGlobales/zzappl.service';
import * as Notiflix from 'notiflix';
import * as printJS from 'print-js';
import * as es6printJS from 'print-js';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css'],
})
export class FacturacionComponent implements OnInit {
  products: any = [];
  /////factura
  scampo: any;
  svalor: any;
  l_serieFAc = '';
  l_sucursalFAc = '';
  Ffac_num = 0;
  l_facfec: any;
  F_fac_obs = '';
  selec: any;
  ////cliente
  Fcli_nom = '';
  Fcli_cod = '';
  l_BusCientes: any;
  l_cli_nom = '';
  l_cli_cod = '';
  l_Cli_est = '';
  l_Cli_email: any;
  l_cli_nid = '';
  l_alert = false;
  l_tmpCli_cod = '';
  l_tmpCli_nom = '';
  fcoCobro: any;
  procesar = false;
  ////articulo///
  fart_cod = '';
  fart_nom = '';
  fart_cant = 1;
  fdt_cant = 0;
  ////
  l_Buscarticulo: any;
  l_datosArt: any = [];
  l_art_cant = 1;
  l_art_cod = '';
  l_art_nom = '';
  l_art_total = 0;
  l_art_prec = 0;
  l_id = 0;
  l_cantAu = 0;
  l_tmpart_cod = '';
  l_tmpart_nom = '';
  // arrays//
  datatable: any = [];
  NunFAc: any = [];
  clientes: any = [];
  idarticulocod: any;
  idarticulonom: any;
  datostabla: any;
  ///dialogo variable
  dialogRef: any;
  dialogRef1: any;
  factura: Facturacion = new Facturacion();
  datocli: any;
  datosart: any;
  vertable = false;
  //facturacion
  l_fdt_sec = 0;
  fIVA = 0;
  F_Bagregar = false;
  path = '';
  constructor(
    private readonly _rutaDatos: ActivatedRoute,
    private GlobalService: GlobalService,
    private gvariables: VariablesGlobalesService,
    public gvariablesBus: VariablesFacturacion,
    public dialog: MatDialog,
    public dialog1: MatDialog,
    private Zzappl: ZzapplService,
    private zzglob: ZzglobService
  ) {}

  ngOnInit(): void {
    this.gvariables.g_empid = {
      id: this._rutaDatos.snapshot.params,
    };
    this.gvariables.g_nemp = {
      emp: this._rutaDatos.snapshot.params,
    };
    this.InicializarCampos();

    let fec = new DatePipe('en-US');
    this.l_facfec = fec.transform(Date.now(), 'dd-MM-yyyy');
    this.GlobalService.metodoGet(
      'https://localhost:7232/Factura/Cobro/Select?p_Usr=' +
        this.gvariables.g_empid.id.id
    ).subscribe((res: any) => {
      this.fcoCobro = res.result;
      console.log(this.fcoCobro);
    });
    //console.log(this.gvariables.g_nemp);
  }
  //funciones para abrir los dialogos
  openDialogcli() {
    this.dialogRef1 = this.dialog1.open(ClienteDialogoComponent);
    this.dialogRef1.afterClosed().subscribe((result: any) => {
      let id = document.getElementById('cli_cod');
      id?.focus();
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogArt() {
    this.dialogRef = this.dialog.open(ArticuloDialogoComponent);
    this.dialogRef.afterClosed().subscribe((result: any) => {
      let id = document.getElementById('idart_cod');
      id?.focus();
      console.log(`Dialog result: ${result}`);
    });
  }
  // funcion para agregar articulo
  agregarArt() {
    if (this.gvariablesBus.g_DatosArt.art_cod == '' && this.fart_nom == '') {
      this.zzglob.mensaje('error', 'Debe LLenar Los Campos');
    } else {
      this.l_fdt_sec = this.l_fdt_sec + 1;
      this.factura.cli_cod = this.l_cli_cod;
      this.factura.Detalles.push({
        id: (this.l_id = this.l_id + 1),
        emp_cod: this.gvariables.g_nemp.emp.emp,
        fac_doc: this.factura.fac_doc,
        fac_num: this.factura.fac_num,
        fdt_sec: this.l_fdt_sec,
        art_cod: this.gvariablesBus.g_DatosArt.art_cod,
        art_nom: this.gvariablesBus.g_DatosArt.art_nom,
        fdt_cant: this.fart_cant,
        fdt_prec: this.gvariablesBus.g_DatosArt.art_prec,
        fdt_iva: this.gvariablesBus.g_DatosArt.art_pimpto,
        fdt_desc: 0,
        fdt_sub: this.gvariablesBus.g_DatosArt.art_prec * this.fart_cant,
        fdt_obs: this.gvariablesBus.g_DatosArt.art_descrip,
      });

      if (this.factura.Detalles.length != 0) {
        this.vertable = true;
        return this.sacarSub();
      }
    }
  }
  ///funcion para el subtotal y iva y total
  sacarSub() {
    this.gvariablesBus.gsubtotal0 = 0;
    this.gvariablesBus.gsubtotal1 = 0;
    this.gvariablesBus.g_iva = 0;
    for (var i = 0, element; (element = this.factura.Detalles[i++]); ) {
      if (element.fdt_iva == 0) {
        this.gvariablesBus.gsubtotal = element.fdt_sub;
        this.gvariablesBus.gsubtotal0 =
          this.gvariablesBus.gsubtotal0 + this.gvariablesBus.gsubtotal;
        console.log(this.gvariablesBus.gsubtotal0);
      } else if (element.fdt_iva == 12) {
        this.gvariablesBus.gsubtotal = element.fdt_sub;
        this.gvariablesBus.gsubtotal1 =
          this.gvariablesBus.gsubtotal1 + this.gvariablesBus.gsubtotal;
        this.gvariablesBus.g_iva = (this.gvariablesBus.gsubtotal1 * 12) / 100;
        console.log(this.gvariablesBus.gsubtotal1);
      }
    }
    this.gvariablesBus.g_total =
      this.gvariablesBus.gsubtotal0 +
      this.gvariablesBus.gsubtotal1 +
      this.gvariablesBus.g_iva +
      this.gvariablesBus.g_dec;
    //console.log('total :', this.gvariablesBus.g_total);
  }
  //funcion de la teclas f4 ,esc,eliminar
  precionarTecla(event: any, id: any, idinput: any) {
    if (event.keyCode == 115) {
      if (id == 'divCliente') {
        this.scampo = document.getElementById('' + idinput + '');
        this.svalor = this.scampo.value;
        this.gvariablesBus.g_idU = this.gvariables.g_empid.id.id;
        this.gvariablesBus.g_IdEmp = this.gvariables.g_nemp.emp.emp;
        this.gvariablesBus.g_cli_tid = idinput;
        this.gvariablesBus.g_cli_dato = this.svalor;
        return this.openDialogcli();
      } else if (id == 'divArticulo') {
        this.scampo = document.getElementById('' + idinput + '');
        this.svalor = this.scampo.value;
        console.log('campo', idinput, 'valor', this.svalor);
        this.gvariablesBus.g_idU = this.gvariables.g_empid.id.id;
        this.gvariablesBus.g_IdEmp = this.gvariables.g_nemp.emp.emp;
        this.gvariablesBus.gart_campo = idinput;
        this.gvariablesBus.gart_valor = this.svalor;
        return this.openDialogArt();
      }
    } else if (event.keyCode == 27) {
      this.dialogRef.afterClosed().subscribe((result: any) => {
        console.log(`Dialog result: ${result}`);
      });
    } else if (event.keyCode == 8) {
    }
  }
  //eliminar articulos tabla
  eliminar(ids: any) {
    const ideli = this.factura.Detalles.findIndex((elemto) => {
      return elemto.id === ids.id;
    });
    console.log(ideli);

    this.factura.Detalles.splice(ideli, 1);
    return this.sacarSub();
  }
  //focus del input de la tabla
  fousTable(dato: any, valor: any) {
    if (valor.id == 'idTcant') {
      const ideli = this.factura.Detalles.findIndex((elemto) => {
        return elemto.id === dato.id;
      });

      console.log(dato);
      this.factura.Detalles.splice(ideli, 1, {
        id: dato.id,
        emp_cod: this.gvariables.g_nemp.emp.emp,
        fac_doc: dato.fac_doc,
        fac_num: dato.fac_num,
        fdt_sec: dato.fdt_sec,
        art_cod: dato.art_cod,
        art_nom: dato.art_nom,
        fdt_cant: valor.value,
        fdt_prec: dato.fdt_prec,
        fdt_iva: dato.fdt_iva,
        fdt_desc: 0,
        fdt_sub: valor.value * dato.fdt_prec,
        fdt_obs: dato.art_descrip,
      });
      //alert('dato cambiado');
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'DATO  CAMBIADO',
        showConfirmButton: false,
        timer: 1500,
      });

      console.log(this.factura.Detalles);
      return this.sacarSub();
    } else if (valor.id == 'art_descrip') {
      const ideli = this.factura.Detalles.findIndex((elemto) => {
        return elemto.id === dato.id;
      });

      console.log(dato);
      this.factura.Detalles.splice(ideli, 1, {
        id: dato.id,
        emp_cod: this.gvariables.g_nemp.emp.emp,
        fac_doc: dato.fac_doc,
        fac_num: dato.fac_num,
        fdt_sec: dato.fdt_sec,
        art_cod: dato.art_cod,
        art_nom: dato.art_nom,
        fdt_cant: dato.fdt_cant,
        fdt_prec: dato.fdt_prec,
        fdt_iva: dato.fdt_iva,
        fdt_desc: 0,
        fdt_sub: dato.fdt_sub,
        fdt_obs: valor.value,
      });
      //alert('dato cambiado');
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Descripcion Agregada',
        showConfirmButton: false,
        timer: 1500,
      });

      console.log(this.factura.Detalles);
      return this.sacarSub();
    }
  }
  //focus
  foucusOut(idCamp: any, iddiv: string) {
    this.scampo = document.getElementById('' + idCamp + '');
    this.svalor = this.scampo.value;
    var lparam =
      'p_Emp=' +
      this.gvariables.g_nemp.emp.emp +
      '&p_Campo=' +
      idCamp +
      '&p_Valor=' +
      this.svalor +
      '&p_Usr=' +
      this.gvariables.g_empid.id.id;
    if (iddiv == 'divCliente') {
      if (idCamp == 'cli_cod' || idCamp == 'cli_nid') {
        if (this.svalor == '') {
          this.scampo = document.getElementById('' + idCamp + '');
          this.scampo.placeholder = this.l_tmpCli_cod;
          this.scampo.placeholder = this.l_tmpCli_nom;
        } else {
          this.GlobalService.metodoGet(
            'https://localhost:7232/Cliente/ExistenciaCliente?' + lparam
          ).subscribe((res: any) => {
            this.l_BusCientes = res.result;
            //console.log(this.l_BusCientes);
            if (res.success == false) {
              this.zzglob.mensaje(
                'error',
                'El ' + this.scampo.name + ' No Existe'
              );
              this.l_tmpCli_cod = this.svalor;
              this.l_tmpCli_nom = this.svalor;
              this.l_cli_nid = '';
              this.l_cli_cod = '';
              this.scampo = document.getElementById('' + idCamp + '');
              this.scampo.focus();
            }
            this.gvariablesBus.g_DatosCli.cli_cod =
              this.l_BusCientes[0].cli_cod;
            this.gvariablesBus.g_DatosCli.cli_nom =
              this.l_BusCientes[0].cli_nom;
            this.gvariablesBus.g_DatosCli.cli_est =
              this.l_BusCientes[0].cli_est;
            this.gvariablesBus.g_DatosCli.cli_nid =
              this.l_BusCientes[0].cli_nid;
            this.gvariablesBus.g_DatosCli.cli_email =
              this.l_BusCientes[0].cli_email;
          });
        }
      }
    } else {
      if (this.svalor == '') {
        this.scampo = document.getElementById('' + idCamp + '');
        this.scampo.placeholder = this.l_tmpart_cod;
      } else {
        this.GlobalService.metodoGet(
          'https://localhost:7232/Articulo/ExistenciaArticulo?' + lparam
        ).subscribe((res: any) => {
          this.l_Buscarticulo = res.result;
          //console.log(res);

          if (this.l_Buscarticulo.length == 0) {
            this.zzglob.mensaje(
              'error',
              'El ' + this.scampo.name + ' No Existe'
            );
            this.l_tmpart_cod = this.svalor;
            this.gvariablesBus.g_DatosArt.art_cod = '';
            this.scampo = document.getElementById('' + idCamp + '');
            this.scampo.focus();
          }
          this.gvariablesBus.g_DatosArt.art_nom =
            this.l_Buscarticulo[0].art_nom;
          this.gvariablesBus.g_DatosArt.art_pimpto =
            this.l_Buscarticulo[0].art_pimpto;
          this.gvariablesBus.g_DatosArt.art_prec =
            this.l_Buscarticulo[0].art_prec;
          //console.log(this.l_Buscarticulo);
        });
      }
    }
  }
  //funcion para limpiar los campos
  clear(id: string) {
    if (id === 'divCliente') {
      this.datocli = document.getElementById('cli_cod');
      this.datocli.value = '';
      this.datocli = document.getElementById('cli_nom');
      this.datocli.value = '';
      this.datocli = document.getElementById('cli_est');
      this.datocli.value = '';
      this.datocli = document.getElementById('cli_email');
      this.datocli.value = '';
    } else {
      this.datosart = document.getElementById('idart_cod');
      this.datosart.value = '';
      this.datosart = document.getElementById('idart_nom');
      this.datosart.value = '';
      this.fart_cant = 0;
      this.datosart = document.getElementById('idart_prec');
      this.datosart.value = '';
      this.datosart = document.getElementById('idart_pimpto');
      this.datosart.value = '';
    }
  }
  obCont() {
    this.GlobalService.metodoGet(
      'https://localhost:7232/Factura/Select/contador?p_Usr=' +
        this.gvariables.g_empid.id.id
    ).subscribe((res: any) => {
      console.log(res.result[0].cnt_val);
      this.factura.fac_num = res.result[0].cnt_val;
    });
  }
  InicializarCampos() {
    this.obCont();
    this.factura.fac_doc = 'FAC';
    this.factura.fac_est = 'DIG';
    this.factura.fac_ser = '001-001';
    this.factura.suc_cod = 'S01';
    this.factura.emp_cod = this.gvariables.g_nemp.emp.emp;
  }
  EnviarEmail() {
    console.log('numero factura ', this.l_Cli_email);
    if (this.l_Cli_email == this.factura.fac_num) {
      Notiflix.Loading.standard('ENVIANDO...');
      this.GlobalService.metodoGet(
        'https://localhost:7232/Select?p_FacN=' +
          this.l_Cli_email +
          '&p_Usr=' +
          this.gvariables.g_empid.id.id
      ).subscribe((res: any) => {
        console.log(res);
        Notiflix.Loading.remove(1923);
      });
    }
  } //funcion para  enviar la factura
  Guardar(documen: any): any {
    this.factura.fac_sub0 = this.gvariablesBus.gsubtotal0;
    this.factura.fac_sub1 = this.gvariablesBus.gsubtotal1;
    this.factura.fac_impto = this.gvariablesBus.g_iva;
    this.factura.fac_tot = this.gvariablesBus.g_total;
    this.factura.cli_cod = this.l_cli_cod;
    this.factura.fac_obs = this.F_fac_obs;
    this.selec = document.getElementById('fco_cod');
    this.factura.fco_cod = this.selec.value;
    if (this.Zzappl.gGuardar(documen) == false) {
      return false;
    }
    this.agregarArt();
    this.GlobalService.metodoPost(
      'https://localhost:7232/Facturacion/Facturacion?p_Usr=' +
        this.gvariables.g_empid.id.id,
      this.factura
    ).subscribe((res: any) => {
      // console.log('resultado bak', res);
      if (res.success == true) {
        this.l_Cli_email = this.factura.fac_num;
        this.zzglob.mensaje('success', 'OK, ' + res.message + '');
        this.procesar = true;
        // console.log('el resultado ', res, 'la factura  ',JSON.stringify(this.factura) )
      } else {
        this.zzglob.mensaje('error', res.message);
      }
      //console.log('el resultado ', resultado, 'la factura  ',this.factura);
    });
  }
  refresh(): void {
    window.location.reload();
  }
  textarea() {
    console.log(this.F_fac_obs);
  }
  lAntesGuardar(val: any) {
    return true;
  }
  imprimir() {
    this.path = './assets/2.pdf';
    printJS(this.path);
  }
}
