import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { __values } from 'tslib';
import { recorrerformulario } from '../menu/serviceMenu/Recorreformulario';
import { VariablesGlobalesService } from '../menu/serviceMenu/variables-globales.service';
import { articulo } from '../model/articulo';
import { Detalles } from '../model/Detalle';
import { Facturacion } from '../model/Facturacion';
import { GlobalService } from '../services/GserviceGPPD';
@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css'],

})

export class FacturacionComponent implements OnInit {
 ////tabla


 products:any=[];
 /////factura
 l_serieFAc=""
 l_sucursalFAc=""
 l_NumFac=0
 l_facfec=''
 ////cliente
 l_fecfa=getLocaleDateTimeFormat
 l_idCliente:any
 l_nomCli=""
 l_cli_cod=""
 l_estCli=""
 l_catCli=""
 ////articulo////
 l_CantArt=0
 l_codArt=""
 l_nomArt=""
 l_TotalArt=0
 l_precioArt=0
 l_subTotal=0
  datatable:any=[];
  NunFAc:any=[]
  clientes:any=[];
  idclientes:any=[];
  idarticulo:any=[];
facturacion:Facturacion = new Facturacion();
public articulosDatos=this.FormBuilder.group({

     fdt_cant:[0,Validators.required],

})
  constructor(
    private readonly _rutaDatos: ActivatedRoute,
    private _router:Router,
    private GlobalService:GlobalService,
    private gvariables:VariablesGlobalesService,
    private _bottomSheet: MatBottomSheet,
    private FormBuilder:FormBuilder,
    private armarinser:recorrerformulario,
    private fb:FormBuilder,

  ) {
   this.facturacion

  }



  displayedColumns: string[] = ['fac_num', 'art_cod', 'fdt_cant', 'fdt_prec','iva', 'fdt_sub','boton'];
  ngOnInit(): void {
    this.gvariables.g_empid = {
      id: this._rutaDatos.snapshot.params
    };

  }
  dataSource = new MatTableDataSource<articulo>(this.datatable.Data);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
    buscarcli(){

      this.GlobalService

      .metodoGet(`https://localhost:44373/Cliente/ConsultaNombre?cliente=`+this.facturacion.cli_cod+`&usuario=`+this.gvariables.g_empid.id.id)
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
   this.l_subTotal=this.l_CantArt*this.l_precioArt
  console.log(this.l_nomCli)

      });

    }

 agregarArt(){
this.facturacion.Detalle.push(
  {emp_cod:'G01',
  fac_num:this.facturacion.fac_num,
  art_cod:this.l_codArt,
  fdt_cant:this.l_CantArt,
  fdt_prec:this.l_precioArt,
  fdt_sub:this.l_subTotal
  }

  );



}



enviar(){

this.facturacion.Detalle=this.facturacion.Detalle;
console.log(JSON.stringify(this.facturacion))

}




}
