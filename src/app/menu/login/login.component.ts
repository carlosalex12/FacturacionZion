import { Component, OnInit ,Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/GserviceGPPD';
import { VariablesGlobalesService } from '../serviceMenu/variables-globales.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forms:FormGroup
  ///variable locales
l_user='' ;
l_pass='';
datatable:any=[];
//llamar al servicio de login y integrarlo al contructor

  constructor(
  private router: Router,
  private fb:FormBuilder,
  private _snackBar: MatSnackBar ,
  private GlobalService:GlobalService,
  private G_variables:VariablesGlobalesService

    )
{
//validacion de imput
this.forms=this.fb.group({
Usuario:['',Validators.required],
Contrasena:['',Validators.required]
})

}

  ngOnInit(): void {


  }
ingresar(){
//llama al servicio
  this.GlobalService
    .metodoGet(`https://localhost:44381/Acceso/GetLogin?p_usr=`+this.l_user+`&p_clv=`+this.l_pass)
    .subscribe((resultadoMetodoGet:any) => {
    console.log(resultadoMetodoGet)
    this.G_variables.g_user=(resultadoMetodoGet[0].usr_cod);
    this.G_variables.g_pass=(resultadoMetodoGet[0].usr_clv)
    this.G_variables.g_empid=(resultadoMetodoGet[0].usr_cod)
    this.G_variables.g_nemp=(resultadoMetodoGet[0].emp_cod)
  if(this.l_user ==this.G_variables.g_user && this.l_pass==this.G_variables.g_pass){

    console.log("nombre Empreza",this.G_variables.g_nemp)

  alert('Bienvenido:'+this.G_variables.g_user)
  this.router.navigate(
   [`/home/`+ this.G_variables.g_empid+'/'+ this.G_variables.g_nemp]

 )
}else if(this.l_user  !== this.G_variables.g_user || this.l_pass !== this.G_variables.g_pass){

  alert('Usuario o contraseña no existentes')

}


    });

}
}
