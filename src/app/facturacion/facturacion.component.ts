import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit ,ViewChild, ɵɵqueryRefresh} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { __values } from 'tslib';
import { VariablesGlobalesService } from '../menu/serviceMenu/variables-globales.service';
import { Facturacion } from '../model/Facturacion';
import { GlobalService } from '../services/GserviceGPPD';
import {MatDialog} from '@angular/material/dialog';
import { ClienteDialogoComponent } from './cliente-dialogo/cliente-dialogo.component';
import { VariablesGlobalesBusqueda } from './variables-globales.service';
import { ArticuloDialogoComponent } from './articulo-dialogo/articulo-dialogo.component';


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
 l_BusCientes:any
 l_nomCli=""
 l_cli_cod=""
 l_estCli=""
 l_catCli=""
 ////articulo///
 l_Buscarticulo:any
 l_datosArt:any=[]
 l_CantArt=0
 l_codArt=""
 l_nomArt=""
 l_TotalArt=0
 l_precioArt=0
 l_subTotal=0
 l_id=0
 l_cantAu=0
  datatable:any=[];
  NunFAc:any=[]
  clientes:any=[];
  idclientes:any=[];
  idarticulo:any=[];
  datostabla:any
 l_totalG=0
 ///dialogo variable
 dialogRef:any
factura:Facturacion = new Facturacion();

  constructor
  (
    private readonly _rutaDatos: ActivatedRoute,
    private GlobalService:GlobalService,
    private gvariables:VariablesGlobalesService,
    private gvariablesBus:VariablesGlobalesBusqueda,
    public dialog: MatDialog,

  )
  { }




  openDialogcli() {
     this.dialogRef = this.dialog.open(ClienteDialogoComponent);
  }
  openDialogArt() {
    this.dialogRef = this.dialog.open(ArticuloDialogoComponent);
 }

  ngOnInit(): void {
    this.gvariables.g_empid = {
      id: this._rutaDatos.snapshot.params
    };


  }



  ngAfterViewInit() {

  }
    buscarcli(){

      this.GlobalService

      .metodoGet(`https://localhost:44381/Cliente/GetId?p_id=`+this.factura.cli_cod+`&p_nom=`+this.l_nomCli+`&p_usr=`+this.gvariables.g_empid.id.id)
      .subscribe((res:any) => {
        this.l_BusCientes=res;
        console.log(this.l_BusCientes);
        //this.l_nomCli=this.idclientes[0].cli_nom
        this.l_estCli=this.l_BusCientes[0].cli_est
        this.l_catCli=this.l_BusCientes[0].ccl_cod
        console.log(this.l_BusCientes)
      });


    }
    buscArt(){

      this.GlobalService

      .metodoGet(`https://localhost:44381/Articulo/GetId?p_id=`+this.l_codArt+`&p_nom=`+this.l_nomArt+`&p_usr=`+this.gvariables.g_empid.id.id)
      .subscribe((res:any) => {
        this.l_Buscarticulo=res;
        console.log(this.l_Buscarticulo)
        this.l_nomArt=this.l_Buscarticulo[0].art_nom
        this.l_precioArt=this.l_Buscarticulo[0].art_prec
        this.l_subTotal=this.l_CantArt*this.l_precioArt

          this.factura.Detalle.push(
            {
            id:this.l_id=this.l_id+1,
            emp_cod:'G01',
            fac_num:this.factura.fac_num,
            art_cod:this.l_codArt,
            art_nom:this.l_nomArt,
            fdt_cant:this.l_CantArt,
            fdt_prec:this.l_precioArt,
            fdt_sub:this.l_subTotal
            }
            );
 this.l_totalG=this.l_totalG+this.l_subTotal

      });


    }

    Precionar_teclaCli(){
      document.addEventListener('keydown', (event) => {
          if (event.keyCode == 113) {
            this.gvariablesBus.g_idU=this.gvariables.g_empid.id.id
            this.gvariablesBus.g_clicod=this.factura.cli_cod
            this.gvariablesBus.g_clinom=this.l_nomCli
             return this.openDialogcli();
          }else if(event.keyCode == 27){
          this.dialogRef.afterClosed().subscribe((result:any)=> {
            console.log(`Dialog result: ${result}`);
          });
        }
      })
    }

    Precionar_teclaArt(){

      document.addEventListener('keydown', (event) => {
        this.gvariablesBus.g_idU=this.gvariables.g_empid.id.id
        this.gvariablesBus.g_clicod=this.factura.cli_cod
        this.gvariablesBus.g_clinom=this.l_nomCli
          if (event.keyCode == 115) {
             return this.openDialogArt();
          }else if(event.keyCode == 27){
          this.dialogRef.afterClosed().subscribe((result:any)=> {
            console.log(`Dialog result: ${result}`);
          });
        }
      })
    }
 agregarArt(){


}

//eliminar
eliminar(ids:any)
{

const ideli=this.factura.Detalle.findIndex((elemto)=>{

  return elemto.id===ids
})
 console.log(ideli)

this.factura.Detalle.splice(ideli,1)
console.log(this.factura.Detalle)

}




enviar(){

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


