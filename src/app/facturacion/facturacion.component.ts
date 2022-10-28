
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { __values } from 'tslib';
import { VariablesGlobalesService } from '../menu/serviceMenu/variables-globales.service';
import { Facturacion } from '../model/Facturacion';
import { GlobalService } from '../services/GserviceGPPD';
import { MatDialog } from '@angular/material/dialog';
import { ClienteDialogoComponent } from './cliente-dialogo/cliente-dialogo.component';
import { VariablesGlobalesBusqueda } from './service/variables-globales.service';
import { ArticuloDialogoComponent } from './articulo-dialogo/articulo-dialogo.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css'],
})
export class FacturacionComponent implements OnInit {
  products: any = [];
  /////factura
  l_serieFAc = '';
  l_sucursalFAc = '';
  Ffac_num = 0;
  l_facfec = '';
  ////cliente
  Fcli_nom = '';
  Fcli_cod = '';
  l_BusCientes: any;
  l_cli_nom = '';
  l_cli_cod = '';
  l_Cli_est = '';
  l_Cli_cat = '';
  l_alert = false;
  l_tmpCli_cod = '';
  l_tmpCli_nom = '';
  ////articulo///
  fart_cod = '';
  fart_nom = '';
  fart_cant = 0;
  fdt_cant = 0;
  ////
  l_Buscarticulo: any;
  l_datosArt: any = [];
  l_art_cant = 0;
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
  F_Bagregar=false
  constructor
  (
    private readonly _rutaDatos: ActivatedRoute,
    private GlobalService: GlobalService,
    private gvariables: VariablesGlobalesService,
    public gvariablesBus: VariablesGlobalesBusqueda,
    public dialog: MatDialog,
    public dialog1: MatDialog,
  ) {}

  ngOnInit(): void {
    this.gvariables.g_empid = {
      id: this._rutaDatos.snapshot.params,
    };
    this.gvariables.g_nemp = {
      emp: this._rutaDatos.snapshot.params,
    };

    //console.log(this.gvariables.g_nemp);

  }
//funciones para abrir los dialogos
  openDialogcli() {
    this.dialogRef1 = this.dialog1.open(ClienteDialogoComponent);
    this.dialogRef1.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogArt() {
    this.dialogRef = this.dialog.open(ArticuloDialogoComponent);
    this.dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  // funcion para agregar articulo
  agregarArt() {

    this.idarticulocod=document.getElementById('idart_cod')
    this.idarticulonom=document.getElementById('idart_nom')
      this.l_fdt_sec = this.l_fdt_sec + 1;
      this.datocli = document.getElementById('idcli_cod');
      this.factura.cli_cod = this.datocli.value;
      this.factura.emp_cod=this.gvariables.g_nemp.emp.emp

      if(this.idarticulocod.value==""&&this.idarticulonom.value==""){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'LLENE LOS CAMPOS ',
          footer: ''
        })
      }else{
        if (this.fart_cod == '' && this.fart_nom == '') {
          if (this.fart_cant == 0) {
            this.factura.Detalles.push({
              id: (this.l_id = this.l_id + 1),
              emp_cod: this.gvariables.g_nemp.emp.emp,
              fac_doc: 'FAC',
              fac_num: this.factura.fac_num,
              fdt_sec: this.l_fdt_sec,
              art_cod: this.gvariablesBus.g_DatosArt.art_cod,
              art_nom: this.gvariablesBus.g_DatosArt.art_nom,
              fdt_cant: 1,
              fdt_prec: this.gvariablesBus.g_DatosArt.art_prec,
              fdt_iva: this.gvariablesBus.g_DatosArt.art_pimpto,
              fdt_desc: 0,
              fdt_sub: this.gvariablesBus.g_DatosArt.art_prec,
            });

          } else {
            this.factura.Detalles.push({
              id: (this.l_id = this.l_id + 1),
              emp_cod: this.gvariables.g_nemp.emp.emp,
              fac_doc: 'FAC',
              fac_num: this.factura.fac_num,
              fdt_sec: this.l_fdt_sec,
              art_cod: this.gvariablesBus.g_DatosArt.art_cod,
              art_nom: this.gvariablesBus.g_DatosArt.art_nom,
              fdt_cant: this.fart_cant,
              fdt_prec: this.gvariablesBus.g_DatosArt.art_prec,
              fdt_iva: this.gvariablesBus.g_DatosArt.art_pimpto,
              fdt_desc: 0,
              fdt_sub: this.fart_cant * this.gvariablesBus.g_DatosArt.art_prec,
            });

          }
        } else {
          if (this.fart_cant == 0) {
            //this.factura.cli_cod=this.gvariablesBus.g_DatosCli.cli_cod
            this.factura.Detalles.push({
              id: (this.l_id = this.l_id + 1),
              emp_cod: this.gvariables.g_nemp.emp.emp,
              fac_doc: 'FAC',
              fac_num: this.factura.fac_num,
              fdt_sec: this.l_fdt_sec,
              art_cod: this.fart_cod,
              art_nom: this.l_art_nom,
              fdt_cant: 1,
              fdt_prec: this.l_art_prec,
              fdt_iva: this.fIVA,
              fdt_desc: 0,
              fdt_sub: this.l_art_prec,
            });

          } else {
            this.factura.cli_cod = this.gvariablesBus.g_clicod;
            // this.factura.cli_cod=this.gvariablesBus.g_DatosCli.cli_cod
            this.factura.Detalles.push({
              id: (this.l_id = this.l_id + 1),
              emp_cod: this.gvariables.g_nemp.emp.emp,
              fac_doc: 'FAC',
              fac_num: this.factura.fac_num,
              fdt_sec: this.l_fdt_sec,
              art_cod: this.fart_cod,
              art_nom: this.l_art_nom,
              fdt_cant: this.fart_cant,
              fdt_prec: this.l_art_prec,
              fdt_iva: this.fIVA,
              fdt_desc: 0,
              fdt_sub: this.fart_cant * this.l_art_prec,
            });

          }
        }

        if (this.factura.Detalles.length != 0) {
          this.vertable = true;
     return this.sacarSub();
        }


      }


  }

///funcion para el subtotal y iva y total
  sacarSub() {
    this.gvariablesBus.gsubtotal0=0
    this.gvariablesBus.gsubtotal1 =0
    this.gvariablesBus.g_iva =0
    for (var i = 0, element; (element = this.factura.Detalles[i++]); ) {
      if (element.fdt_iva == 0) {
        this.gvariablesBus.gsubtotal=element.fdt_sub
        this.gvariablesBus.gsubtotal0 = this.gvariablesBus.gsubtotal0+this.gvariablesBus.gsubtotal;
        console.log(this.gvariablesBus.gsubtotal0);
      } else if(element.fdt_iva==12){
        this.gvariablesBus.gsubtotal=element.fdt_sub
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
    console.log('total :', this.gvariablesBus.g_total);

  }
  //funcion de la teclas f4 ,esc,eliminar
  precionarTecla(event: any, id: any, idinput: any) {
    if (
      this.fart_cod != '' &&
      this.fart_nom != '' &&
      this.gvariablesBus.g_clicod != '' &&
      this.gvariablesBus.g_clinom != ''
    ) {
      if (event.keyCode == 115) {
        if (id == 'divCliente') {
          this.gvariablesBus.g_idU = this.gvariables.g_empid.id.id;
          return this.openDialogcli();
        } else if (id == 'divArticulo') {
          this.gvariablesBus.g_idU = this.gvariables.g_empid.id.id;
          this.gvariablesBus.g_artcod = this.fart_cod;
          this.gvariablesBus.g_artnom = this.fart_nom;
          return this.openDialogArt();
        }
      } else if (event.keyCode == 27) {
        this.dialogRef.afterClosed().subscribe((result: any) => {
          console.log(`Dialog result: ${result}`);
        });
      } else if (event.keyCode == 8) {
        if (idinput == 'idcli_cod') {
          this.datocli = document.getElementById('idcli_nom');
          this.datocli.value = '';
        } else if (idinput == 'idcli_nom') {
          this.datocli = document.getElementById('idcli_cod');
          this.datocli.value = '';
        } else if (idinput == 'idart_cod') {
          this.datosart = document.getElementById('idart_nom');
          this.datosart.value = '';
        } else if (idinput == 'idart_nom') {
          this.datosart = document.getElementById('idart_cod');
          this.datosart.value = '';
        }
      }
    } else {
      if (event.keyCode == 115) {
        if (id == 'divCliente') {
          this.gvariablesBus.g_idU = this.gvariables.g_empid.id.id;
          return this.openDialogcli();
        } else if (id == 'divArticulo') {
          this.gvariablesBus.g_idU = this.gvariables.g_empid.id.id;
          this.gvariablesBus.g_artcod = this.fart_cod;
          this.gvariablesBus.g_artnom = this.fart_nom;
          return this.openDialogArt();
        }
      } else if (event.keyCode == 27) {
        this.dialogRef.afterClosed().subscribe((result: any) => {
          console.log(`Dialog result: ${result}`);
        });
      } else if (event.keyCode == 8) {
        if (idinput == 'idcli_cod') {
          this.datocli = document.getElementById('idcli_nom');
          this.datocli.value = '';
        } else if (idinput == 'idcli_nom') {
          this.datocli = document.getElementById('idcli_cod');
          this.datocli.value = '';
        } else if (idinput == 'idart_cod') {
          this.datosart = document.getElementById('idart_nom');
          this.datosart.value = '';
        } else if (idinput == 'idart_nom') {
          this.datosart = document.getElementById('idart_cod');
          this.datosart.value = '';
        }
      }
    }
  }

  //eliminar articulos
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
    const ideli = this.factura.Detalles.findIndex((elemto) => {
      return elemto.id === dato.id;
    });

    console.log(dato);
    this.factura.Detalles.splice(ideli, 1, {
      id: dato.id,
      emp_cod: this.gvariables.g_nemp.emp.emp,
      fac_doc: 'FAC',
      fac_num: dato.fac_num,
      fdt_sec: dato.fdt_sec,
      art_cod: dato.art_cod,
      art_nom: dato.art_nom,
      fdt_cant: valor,
      fdt_prec: dato.fdt_prec,
      fdt_iva: dato.fdt_iva ,
      fdt_desc: 0,
      fdt_sub: valor * dato.fdt_prec,
    });
    //alert('dato cambiado');
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'DATO  CAMBIADO',
      showConfirmButton: false,
      timer: 1500,
    });
return this.sacarSub();



    console.log(this.factura.Detalles);
  }
  //focus de cliente
  foucuscliente(idCamp: any) {
    if (idCamp.id == 'idcli_cod') {
      if (this.gvariablesBus.g_clicod == '') {
        this.datocli = document.getElementById('idcli_cod');
        this.datocli.placeholder = this.l_tmpCli_cod;
        //this.Fcli_cod = this.l_tmpCli_cod;
      } else {
        this.GlobalService.metodoGet(
          `https://localhost:44381/Cliente/GetExistencia?p_id=` +
            this.gvariablesBus.g_clicod +
            `&p_nom=` +
            this.gvariablesBus.g_clinom +
            `&p_usr=` +
            this.gvariables.g_empid.id.id
        ).subscribe((res: any) => {
          this.l_BusCientes = res;
          //console.log(this.l_BusCientes);
          if (this.l_BusCientes.length == 0) {
            //alert('EL CODIDO DEL CLIENTE NO EXISTE');
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'EL CODIDO DEL CLIENTE NO EXISTE',
              footer: ''
            })
            this.l_tmpCli_cod = this.gvariablesBus.g_clicod;
            this.gvariablesBus.g_clicod = '';
            let id = document.getElementById('idcli_cod');
            id?.focus();
          } else {
            this.l_cli_nom = this.l_BusCientes[0].cli_nom;
            this.l_Cli_est = this.l_BusCientes[0].cli_est;
            this.l_Cli_cat = this.l_BusCientes[0].cli_email;
            this.datocli = document.getElementById('idcli_nom');
            this.datocli.value = this.l_cli_nom;
            this.datocli = document.getElementById('idcli_est');
            this.datocli.value = this.l_Cli_est;
            this.datocli = document.getElementById('idcli_ccl_cod');
            this.datocli.value = this.l_Cli_cat;
          }
        });
      }
    } else if (idCamp.id == 'idcli_nom') {
      if (this.gvariablesBus.g_clinom == '') {
        this.datocli = document.getElementById('idcli_nom');
        this.datocli.placeholder = this.l_tmpCli_nom;
        //this.Fcli_nom = this.l_tmpCli_nom;
      } else {
        this.GlobalService.metodoGet(
          `https://localhost:44381/Cliente/GetExistencia?p_id=` +
            this.gvariablesBus.g_clicod +
            `&p_nom=` +
            this.gvariablesBus.g_clinom +
            `&p_usr=` +
            this.gvariables.g_empid.id.id
        ).subscribe((res: any) => {
          this.l_BusCientes = res;
          //console.log(this.l_BusCientes);
          if (this.l_BusCientes.length == 0) {
           // alert('Cliente No Existe');
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'EL CLIENTE NO EXISTE',
              footer: ''
            })
            this.l_tmpCli_nom = this.gvariablesBus.g_clinom;
            this.gvariablesBus.g_clinom = '';
            let id = document.getElementById('idcli_nom');
            id?.focus();
          } else if (this.l_BusCientes.length > 0) {
            //alert('mas de un resultado pulse f4');
            Swal.fire(
              'MAS DE UN RESULTADO',
              'Presione f4 pare ver todos los Resultados',
              'question'
            )

          } else {
            this.l_cli_cod = this.l_BusCientes[0].cli_cod;
            this.l_Cli_est = this.l_BusCientes[0].cli_est;
            this.l_Cli_cat = this.l_BusCientes[0].cli_email;
            this.datocli = document.getElementById('idcli_cod');
            this.datocli.value = this.l_cli_cod;
            this.datocli = document.getElementById('idcli_est');
            this.datocli.value = this.l_Cli_est;
            this.datocli = document.getElementById('idcli_ccl_cod');
            this.datocli.value = this.l_Cli_cat;
          }
        });
      }
    }
  }
  //focus de Articulo
  foucusArticulo(idCamp: any) {
    if (idCamp.id == 'idart_cod') {
      if (this.fart_cod == '') {
        this.datosart = document.getElementById('idart_cod');
        this.datosart.placeholder = this.l_tmpart_cod;
        //this.fart_cod = this.l_tmpart_cod;
      } else {
        this.GlobalService.metodoGet(
          `https://localhost:44381/Articulo/GetExistencia?p_id=` +
            this.fart_cod +
            `&p_nom=` +
            this.fart_nom +
            `&p_usr=` +
            this.gvariables.g_empid.id.id
        ).subscribe((res: any) => {
          this.l_Buscarticulo = res;
          console.log(this.l_Buscarticulo);
          if (this.l_Buscarticulo.length == 0) {
           // alert('EL ARTICULO NO EXISTE ');
           Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'EL ARTICULO  NO EXISTE',
            footer: ''
          })
            this.l_tmpart_cod = this.fart_cod;
            this.fart_cod = '';
            let id = document.getElementById('idart_cod');
            id?.focus();
          }else {
            this.l_art_nom = this.l_Buscarticulo[0].art_nom;
            this.l_art_prec = this.l_Buscarticulo[0].art_prec;
            this.fIVA= this.l_Buscarticulo[0].art_pimpto
            this.datosart = document.getElementById('idart_nom');
            this.datosart.value = this.l_art_nom;
            this.gvariablesBus.g_DatosArt.art_prec = this.l_art_prec;
            this.datosart = document.getElementById('idart_sub');
            this.datosart.value = this.fart_cant * this.l_art_prec;
            console.log(this.l_Buscarticulo);

          }
        });
      }
    } else if (idCamp.id == 'idart_nom') {
      if (this.fart_nom == '') {
        this.datosart = document.getElementById('idart_nom');
        this.datosart.placeholder = this.l_tmpart_nom;
        //this.fart_nom = this.l_tmpart_nom;
      } else {
        this.GlobalService.metodoGet(
          `https://localhost:44381/Articulo/GetExistencia?p_id=` +
            this.fart_cod +
            `&p_nom=` +
            this.fart_nom +
            `&p_usr=` +
            this.gvariables.g_empid.id.id
        ).subscribe((res: any) => {
          this.l_Buscarticulo = res;
          console.log(this.l_Buscarticulo);
          if (this.l_Buscarticulo.length == 0) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'EL ARTICULO  NO EXISTE',
              footer: ''
            })
            this.l_tmpart_cod = this.fart_cod;
            this.fart_cod = '';
            let id = document.getElementById('idart_cod');
            id?.focus();
          } else if (this.l_Buscarticulo.length > 0) {
            //alert('mas de un resultado pulse f4');
            Swal.fire(
              'MAS DE UN RESULTADO',
              'Presione f4 pare ver todos los Resultados',
              'question'
            )
          }else {
            this.l_art_cod = this.l_Buscarticulo[0].art_cod;
            this.l_art_prec = this.l_Buscarticulo[0].art_prec;
            this.fIVA= this.l_Buscarticulo[0].art_pimpto
            this.datosart = document.getElementById('idart_cod');
            this.datosart.value = this.l_art_cod;
            this.datosart = document.getElementById('idart_prec');
            this.datosart.value = this.l_art_prec;
            this.datosart = document.getElementById('idart_sub');
            this.datosart.value = this.fart_cant * this.l_art_prec;
          }
        });
      }
    }
  }
//funcion para limpiar los campos
  clear() {
    this.fart_cod = '';
    this.fart_nom = '';
    this.fart_cant = 0;
    this.l_art_prec = 0;
    this.gvariablesBus.gsubtotal = 0;
  }
  //funcion para  enviar la factura
  Guardar() {
    //this.facturacion.Detalle=this.facturacion.Detalle;
    let factura = JSON.stringify(this.factura);
    console.log(factura);
    this.GlobalService.metodoPost(
      'https://localhost:44381/Facturacion/Add?p_usr=' +
        this.gvariables.g_empid.id.id,
      this.factura
    ).subscribe((resultado) => {
      //alert('FACTURA  AÑADIDA');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'FACTURA  AÑADIDA',
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }
}
