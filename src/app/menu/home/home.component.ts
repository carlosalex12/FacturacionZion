import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/GserviceGPPD';

import { VariablesGlobalesService } from '../serviceMenu/variables-globales.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
l_Lemp=''

  constructor(
    private readonly _rutaDatos: ActivatedRoute,
    private _router:Router,
    private GlobalService:GlobalService,
    private Gvariables:VariablesGlobalesService

  ) { }

  ngOnInit(): void {
this.l_Lemp=this.Gvariables.g_Lemp;
   this.Gvariables.g_empid= {
     id: this._rutaDatos.snapshot.params
  };

    console.log("this.iduser");
    console.log(this.Gvariables.g_empid);
    console.log("id.id");
    console.log( this.Gvariables.g_empid.id);



  }

articulo(){
  this.GlobalService

  .metodoGet(`https://localhost:44373/Articulo/ConsultaArticulo?usuario=`+ this.Gvariables.g_empid.id.id)
  .subscribe((resultadoMetodoGet:any) => {
    console.log("resultadoMetodoGet");
  console.log(resultadoMetodoGet)});

  this._router.navigate(
    [`/articulo/`+ this.Gvariables.g_empid.id.id]
  )

}
factura(){
  this.GlobalService

  .metodoGet(`https://localhost:44373/Cliente/Consultas?usuario=`+ this.Gvariables.g_empid.id.id)
  .subscribe((resultadoMetodoGet:any) => {
    console.log("resultadoMetodoGet");
  console.log(resultadoMetodoGet)});

  this._router.navigate(
    [`/factura/`+ this.Gvariables.g_empid.id.id]
  )

}
cliente(){
  this.GlobalService

  .metodoGet(`https://localhost:44373/Factura/Consultas?usuario=`+ this.Gvariables.g_empid.id.id)
  .subscribe((resultadoMetodoGet:any) => {
    console.log("resultadoMetodoGet");
  console.log(resultadoMetodoGet)});

  this._router.navigate(
    [`/cliente/`+ this.Gvariables.g_empid.id.id]
  )



}
prueba(){
  this._router.navigate(
    [`/prueba/`]
  )

}
facturacion(){

  this._router.navigate(
    [`/facturacion/`+ this.Gvariables.g_empid.id.id]
  )
}
}





