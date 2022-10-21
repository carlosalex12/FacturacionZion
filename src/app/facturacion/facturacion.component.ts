import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit, ViewChild, ɵɵqueryRefresh } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { __values } from 'tslib';
import { VariablesGlobalesService } from '../menu/serviceMenu/variables-globales.service';
import { Facturacion } from '../model/Facturacion';
import { GlobalService } from '../services/GserviceGPPD';
import { MatDialog } from '@angular/material/dialog';
import { ClienteDialogoComponent } from './cliente-dialogo/cliente-dialogo.component';
import { VariablesGlobalesBusqueda } from './service/variables-globales.service';
import { ArticuloDialogoComponent } from './articulo-dialogo/articulo-dialogo.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { keyframes } from '@angular/animations';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css'],
})
export class FacturacionComponent implements OnInit {
  ////tabla
  clientecontrol = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

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
  idclientes: any = [];
  idarticulo: any = [];
  datostabla: any;
  ///dialogo variable
  dialogRef: any;
  dialogRef1: any;
  factura: Facturacion = new Facturacion();
  DArt: FormGroup;
  prueba: FormGroup;
  datocli: any;
  datosart: any;
  constructor(
    private readonly _rutaDatos: ActivatedRoute,
    private GlobalService: GlobalService,
    private gvariables: VariablesGlobalesService,
    public gvariablesBus: VariablesGlobalesBusqueda,
    public dialog: MatDialog,
    public dialog1: MatDialog,
    private fb: FormBuilder
  ) {
    this.DArt = this.fb.group({
      artcod: ['', Validators.required],
      Contrasena: ['', Validators.required],
    });

    this.prueba = this.fb.group({
      prueba: ['', Validators.required],
    });
  }

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

  ngOnInit(): void {
    this.gvariables.g_empid = {
      id: this._rutaDatos.snapshot.params,
    };
  }

  ngAfterViewInit() {}

  buscArt() {
    if (this.fart_cod == '' && this.fart_nom == '') {
      if(this.fart_cant==0){
        this.factura.Detalle.push({
          id: (this.l_id = this.l_id + 1),
          emp_cod: 'G01',
          fac_num: this.factura.fac_num,
          art_cod: this.gvariablesBus.g_DatosArt.art_cod,
          art_nom: this.gvariablesBus.g_DatosArt.art_nom,
          fdt_cant:1,
          fdt_prec: this.gvariablesBus.g_DatosArt.art_prec,
          fdt_sub: this.gvariablesBus.g_DatosArt.art_prec,
        });
        this.gvariablesBus.g_total =
          this.gvariablesBus.g_total + this.gvariablesBus.gsubtotal;
        this.clear();
      }else{
        this.factura.Detalle.push({
          id: (this.l_id = this.l_id + 1),
          emp_cod: 'G01',
          fac_num: this.factura.fac_num,
          art_cod: this.gvariablesBus.g_DatosArt.art_cod,
          art_nom: this.gvariablesBus.g_DatosArt.art_nom,
          fdt_cant: this.fart_cant,
          fdt_prec: this.gvariablesBus.g_DatosArt.art_prec,
          fdt_sub: this.gvariablesBus.gsubtotal,
        });
        this.gvariablesBus.g_total =
          this.gvariablesBus.g_total + this.gvariablesBus.gsubtotal;
        this.clear();
      }

    } else {
      if(this.fart_cant==0){
        this.factura.cli_cod = this.Fcli_cod;
        this.factura.Detalle.push({
          id: (this.l_id = this.l_id + 1),
          emp_cod: 'G01',
          fac_num: this.factura.fac_num,
          art_cod: this.fart_cod,
          art_nom: this.l_art_nom,
          fdt_cant: 1,
          fdt_prec: this.l_art_prec,
          fdt_sub:this.l_art_prec ,
        });
        this.gvariablesBus.g_total =
          this.gvariablesBus.g_total + this.gvariablesBus.gsubtotal;
        console.log('los datos agregados', this.factura);
      }else{
        this.factura.cli_cod = this.Fcli_cod;
        this.factura.Detalle.push({
          id: (this.l_id = this.l_id + 1),
          emp_cod: 'G01',
          fac_num: this.factura.fac_num,
          art_cod: this.fart_cod,
          art_nom: this.l_art_nom,
          fdt_cant: this.fart_cant,
          fdt_prec: this.l_art_prec,
          fdt_sub: this.gvariablesBus.gsubtotal,
        });
        this.gvariablesBus.g_total =
          this.gvariablesBus.g_total + this.gvariablesBus.gsubtotal;
        console.log('los datos agregados', this.factura);
      }

    }
  }

  precionarTecla(event: any, id: any, idinput: any) {

    if (this.fart_cod != "" && this.fart_nom!= ""&&this.Fcli_cod!= ""&&this.Fcli_nom!= "") {
      if (event.keyCode == 115) {
        if (id == 'divCliente') {
          this.gvariablesBus.g_idU = this.gvariables.g_empid.id.id;
          this.gvariablesBus.g_clicod = this.Fcli_cod;
          this.gvariablesBus.g_clinom = this.Fcli_nom;
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
    }else{
this.fart_cod=""
this.fart_nom=""
this.Fcli_cod=""
this.Fcli_nom=""
if (event.keyCode == 115) {
  if (id == 'divCliente') {
    this.gvariablesBus.g_idU = this.gvariables.g_empid.id.id;
    this.gvariablesBus.g_clicod = this.Fcli_cod;
    this.gvariablesBus.g_clinom = this.Fcli_nom;
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

  agregarArt() {}

  //eliminar
  eliminar(ids: any) {
    const ideli = this.factura.Detalle.findIndex((elemto) => {
      return elemto.id === ids;
    });
    console.log(ideli);

    this.factura.Detalle.splice(ideli, 1);
    this.gvariablesBus.g_total =
      this.gvariablesBus.g_total - this.gvariablesBus.gsubtotal;
  }

  foucuscliente(idCamp: any) {
    if (idCamp.id == 'idcli_cod') {
      if (this.Fcli_cod == '') {
        this.datocli = document.getElementById('idcli_cod');
        this.datocli.placeholder = this.l_tmpCli_cod
        //this.Fcli_cod = this.l_tmpCli_cod;
      } else {
        this.GlobalService.metodoGet(
          `https://localhost:44381/Cliente/GetExistencia?p_id=` +
            this.Fcli_cod +
            `&p_nom=` +
            this.Fcli_nom +
            `&p_usr=` +
            this.gvariables.g_empid.id.id
        ).subscribe((res: any) => {
          this.l_BusCientes = res;
          //console.log(this.l_BusCientes);
          if (this.l_BusCientes.length == 0) {
            alert('EL CODIDO DEL CLIENTE NO EXISTE');
            this.l_tmpCli_cod = this.Fcli_cod;
            // console.log(this.l_tmpCli_cod);
            //this.Fcli_cod = l_tmp;
            this.Fcli_cod = '';
            let id = document.getElementById('idcli_cod');
            id?.focus();
          } else if (this.l_BusCientes.length > 1) {
            alert('mas de un resultado pulse f4');
          } else {
            this.l_cli_nom = this.l_BusCientes[0].cli_nom;
            this.l_Cli_est = this.l_BusCientes[0].cli_est;
            this.l_Cli_cat = this.l_BusCientes[0].ccl_cod;
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
      if (this.Fcli_nom == '') {
        this.datocli = document.getElementById('idcli_nom');
        this.datocli.placeholder = this.l_tmpCli_nom
        //this.Fcli_nom = this.l_tmpCli_nom;
      } else {
        this.GlobalService.metodoGet(
          `https://localhost:44381/Cliente/GetExistencia?p_id=` +
            this.Fcli_cod +
            `&p_nom=` +
            this.Fcli_nom +
            `&p_usr=` +
            this.gvariables.g_empid.id.id
        ).subscribe((res: any) => {
          this.l_BusCientes = res;
          //console.log(this.l_BusCientes);
          if (this.l_BusCientes.length == 0) {
            alert('Cliente No Existe');
            this.l_tmpCli_nom = this.Fcli_nom;
            this.Fcli_nom = '';
            let id = document.getElementById('idcli_nom');
            id?.focus();
          } else {
            this.l_cli_cod = this.l_BusCientes[0].cli_cod;
            this.l_Cli_est = this.l_BusCientes[0].cli_est;
            this.l_Cli_cat = this.l_BusCientes[0].ccl_cod;
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
  foucusArticulo(idCamp: any) {
    if (idCamp.id == 'idart_cod') {
      if (this.fart_cod == '') {
        this.datosart = document.getElementById('idart_cod');
        this.datosart.placeholder = this.l_tmpart_cod
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
            alert('EL ARTICULO NO EXISTE ');
            this.l_tmpart_cod = this.fart_cod;
            this.fart_cod = '';
            let id = document.getElementById('idart_cod');
            id?.focus();
          } else {
            this.l_art_nom = this.l_Buscarticulo[0].art_nom;
            this.l_art_prec = this.l_Buscarticulo[0].art_prec;
            this.datosart = document.getElementById('idart_nom');
            this.datosart.value = this.l_art_nom;
            this.gvariablesBus.g_DatosArt.art_prec = this.l_art_prec;
            this.datosart = document.getElementById('idart_sub');
            this.datosart.value = this.gvariablesBus.gsubtotal;
          }
        });
      }
    } else if (idCamp.id == 'idart_nom') {
      if (this.fart_nom == '') {
        this.datosart = document.getElementById('idart_nom');
        this.datosart.placeholder = this.l_tmpart_nom
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
            alert('EL ARTICULO NO EXISTE ');
            this.l_tmpart_cod = this.fart_cod;
            this.fart_cod = '';
            let id = document.getElementById('idart_cod');
            id?.focus();
          } else {
            this.l_art_cod = this.l_Buscarticulo[0].art_cod;
            this.l_art_prec = this.l_Buscarticulo[0].art_prec;
            this.datosart = document.getElementById('idart_cod');
            this.datosart.value = this.l_art_cod;
            this.datosart = document.getElementById('idart_prec');
            this.datosart.value = this.l_art_prec;
            this.datosart = document.getElementById('idart_sub');
            this.datosart.value = this.gvariablesBus.gsubtotal;
          }
        });
      }
    }
  }

  CantidadOp(id: any) {

    console.log('el precio es:');

    this.gvariablesBus.gsubtotal =
      this.gvariablesBus.g_DatosArt.art_prec * this.fart_cant;
    console.log(this.gvariablesBus.gsubtotal);
  }

  enviar() {
    //console.log(this.elements)
    //console.log(this.elements.tr)
    //console.log(this.elements.row)
    /*this.factura.Detalle.push(
    {emp_cod:'G01',
    fac_num:this.factura.fac_num,
    art_cod:row.cod_art,
    fdt_cant:row.fdt_cant,
    fdt_prec:row.fdt_prec,
    fdt_sub:row.fdt_sub
   }

    );*/
    //if (element.tbody === 'th'){
    // }
    //for (var j = 0, col; col = row.cells[j]; j++) {
    //alert(col[j].innerText);
    //.log(`Txt: ${col.innerText} \tFila: ${i} \t Celda: ${j}`);
    //
    //for let i = 0; i < this.facturacion.Detalle.length; i++) {
    //let Fac_num=[]
    // Fac_num[i]=this.facturacion.Detalle
    //}
    //this.facturacion.Detalle=this.facturacion.Detalle;
    //console.log(JSON.stringify(this.facturacion))
    //console.log(this.facturacion)
  }

  clear() {
    this.fart_cod = '';
    this.fart_nom = '';
    this.fart_cant = 0;
    this.l_art_prec = 0;
    this.gvariablesBus.gsubtotal = 0;
  }
  Guardar() {
    //this.facturacion.Detalle=this.facturacion.Detalle;

    this.GlobalService.metodoPost('', this.factura).subscribe((resultado) => {
      alert('ARTICULO AÑADIDO');

      this.clear();
      console.log(resultado);
    });
  }
}
