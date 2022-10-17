import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit ,ViewChild, ɵɵqueryRefresh} from '@angular/core';
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
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
export  interface User {
  name: string;
}
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
 ////articulo///
 l_datosArt:any=[]
 l_CantArt=0
 l_codArt=""
 l_nomArt=""
 l_TotalArt=0
 l_precioArt=0
 l_subTotal=0
 l_id=0

  datatable:any=[];
  NunFAc:any=[]
  clientes:any=[];
  idclientes:any=[];
  idarticulo:any=[];
  datostabla:any

factura:Facturacion = new Facturacion();



  constructor(
    private readonly _rutaDatos: ActivatedRoute,
    private _router:Router,
    private GlobalService:GlobalService,
    private gvariables:VariablesGlobalesService,
    private _bottomSheet: MatBottomSheet,
    private fb:FormBuilder,
    private armarinser:recorrerformulario,


  ) {

  }
  displayedColumns: string[] = ['fac_num', 'art_cod', 'fdt_cant', 'fdt_prec','iva', 'fdt_sub','boton'];

  ngOnInit(): void {
    this.gvariables.g_empid = {
      id: this._rutaDatos.snapshot.params
    };




  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }


  dataSource = new MatTableDataSource<articulo>(this.datatable.Data);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
    buscarcli(){

      this.GlobalService

      .metodoGet(`https://localhost:44373/Cliente/ConsultaNombre?cliente=`+this.factura.cli_cod+`&usuario=`+this.gvariables.g_empid.id.id)
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

      this.factura.Detalle.push(
        {
        id:this.l_id=this.l_id+1,
        emp_cod:'G01',
        fac_num:this.factura.fac_num,
        art_cod:this.l_codArt,
        fdt_cant:this.l_CantArt,
        fdt_prec:this.l_precioArt,
        fdt_sub:this.l_subTotal
        }
        );
      });

this.datostabla=this.factura.Detalle

    }

 agregarArt(){


}

//eliminar
eliminar(item:any)
{
  this.datostabla=Object.values(this.factura.Detalle)
  console.log(this.datostabla)
  delete this.datostabla[item-1]

  //for (let i = 0; i < this.factura.Detalle.length; i++) {
//let eliminar=this.factura.Detalle[i].id

    //    console.log(eliminar)
      //}
 // console.log(item)
//delete this.factura.Detalle[item-1]
  //let mayorQueDiez = this.factura.Detalle.filter(id =>id = item);

//this.factura.Detalle.omit(item)
//this.factura.Detalle.splice(item-1)
//console.log(delete mayorQueDiez[item])
//console.log( mayorQueDiez)
}


///
elements:any


enviar(){
this.elements = document.getElementById("Detalle")
//console.log(this.elements)
//console.log(this.elements.tr)
//console.log(this.elements.row)
for (var i = 0, row; row =this.elements.rows[i];i++) {

  console.log(row)

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
  //}
}
//for (let i = 0; i < this.facturacion.Detalle.length; i++) {
  //let Fac_num=[]
 // Fac_num[i]=this.facturacion.Detalle

//}
//this.facturacion.Detalle=this.facturacion.Detalle;
//console.log(JSON.stringify(this.facturacion))
//console.log(this.facturacion)
}

clear(){
this.l_codArt=""
this.l_nomArt=""
this.l_CantArt=0
this.l_precioArt=0
this.l_subTotal=0
}
Guardar(){
  //this.facturacion.Detalle=this.facturacion.Detalle;

this.GlobalService
.metodoPost("",(this.factura)

)
.subscribe((resultado)=>{

  alert('ARTICULO AÑADIDO')

  this.clear();
  console.log(resultado);

})


}

}
