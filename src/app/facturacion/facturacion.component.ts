import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { recorrerformulario } from '../menu/serviceMenu/Recorreformulario';
import { VariablesGlobalesService } from '../menu/serviceMenu/variables-globales.service';
import { articulo } from '../model/articulo';
import { clientes } from '../model/cliente';
import { facturas } from '../model/factura';
import { GlobalService } from '../services/GserviceGPPD';
@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css'],
})

export class FacturacionComponent implements OnInit {
 ////tabla
 products:any=[];
 /////
 l_fecfa=getLocaleDateTimeFormat
 l_nomCli=""
 l_estCli=""
 l_catCli=""
 l_CantArt=0
 l_codArt=""
 l_nomArt=""
 l_TotalArt=0
 l_precioArt=0
  l_idCliente:any
  l_NumFac=0
  cliente:clientes = new clientes ();
  Factura:facturas = new facturas ();
  Articulo:articulo = new articulo  ();
  datatable:any=[];
  NunFAc:any=[]
  clientes:any=[];
  idclientes:any=[];
  idarticulo:any=[];

  constructor(
    private readonly _rutaDatos: ActivatedRoute,
    private _router:Router,
    private GlobalService:GlobalService,
    private gvariables:VariablesGlobalesService,
    private _bottomSheet: MatBottomSheet,
    private FormBuilder:FormBuilder,
    private armarinser:recorrerformulario
  ) { }
  displayedColumns: string[] = ['fac_num', 'art_cod', 'fdt_cant', 'fdt_prec','iva', 'fdt_sub','boton'];
  ngOnInit(): void {
    this.gvariables.g_empid = {
      id: this._rutaDatos.snapshot.params
    };
    this.GlobalService
    .metodoGet(`https://localhost:44373/FacturaDetalle/Consultas?l_usr=`+this.gvariables.g_empid.id.id)
    .subscribe((res:any) => {
      this.datatable=res.Data;
this.dataSource.data=this.datatable
  console.log(this.datatable)
    });
  }
  dataSource = new MatTableDataSource<articulo>(this.datatable.Data);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
    buscarcli(){

      this.GlobalService

      .metodoGet(`https://localhost:44373/Cliente/ConsultaNombre?cliente=`+this.l_idCliente+`&usuario=`+this.gvariables.g_empid.id.id)
      .subscribe((res:any) => {
        this.idclientes=res.Data;
      console.log(this.idclientes);
 this.l_nomCli=this.idclientes[0].cli_nom
 this.l_estCli=this.idclientes[0].cli_est
 this.l_catCli=this.idclientes[0].ccl_cod
console.log(this.l_nomCli)
      });


    }
    buscArt(){

      this.GlobalService

      .metodoGet(`https://localhost:44373/Articulo/ConsultaNombre?articulo=`+this.l_codArt+`&usuario=`+this.gvariables.g_empid.id.id)
      .subscribe((res:any) => {
        this.idarticulo=res.Data;
      console.log(this.idclientes);
 this.l_nomArt=this.idarticulo[0].art_nom
 this.l_precioArt=this.idarticulo[0].art_prec
 this.l_TotalArt=this.l_CantArt*this.l_precioArt
console.log(this.l_nomCli)
      });

    }
    elements:any

datos:any
 enviar(){

      this.elements = document.getElementById("datosform")
      this.datos=this.armarinser.armarinsert(this.elements)


      console.log((this.elements));
    }


}
