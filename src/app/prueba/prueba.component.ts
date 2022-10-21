import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { recorrerformulario } from '../menu/serviceMenu/Recorreformulario';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from '../services/GserviceGPPD';
import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PruebaComponent implements OnInit {








  datosforms:FormGroup
  constructor
  (
    private http:HttpClient,
    private router: Router,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private gservice:GlobalService,
    private armarinser:recorrerformulario
  )
  {
    this.datosforms=this.fb.group({
      camp1:new FormControl(''),
      camp2:[''],
      camp3:[''],
      tag:[''],
      })
  }

tabla="cliente"
urlin=""
datos:any
  ngOnInit(): void {

  }
  elements:any

//let valores:any[]=[{
  //name:element.name,
 // id:element.id,
//value:element.value
 //}]

mostrarForm(){

}
  guardar(){
    this.elements = document.getElementById("camp1")
   this.datos=this.armarinser.armarinsert(this.elements)
this.elements.value

console.log('datos form')
console.log(this.datos)
console.log('url insert')

this.urlin=this.gservice
.creaURLInsert(this.tabla)

console.log(this.urlin)

  }


}
