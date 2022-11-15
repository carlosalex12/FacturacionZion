import { Component, OnInit ,Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalService } from 'src/app/services/GserviceGPPD';
import Swal from 'sweetalert2';
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
  private G_variables:VariablesGlobalesService,
  private cookiesService:CookieService
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
    .metodoGet(`https://localhost:7232/Login/GetLogin?p_usr=`+this.l_user+`&p_clv=`+this.l_pass)
    .subscribe((resultadoMetodoGet:any) => {
    console.log(resultadoMetodoGet)
    this.G_variables.g_user=(resultadoMetodoGet[0].usr_cod);
    this.G_variables.g_pass=(resultadoMetodoGet[0].usr_clv)
    this.G_variables.g_empid=(resultadoMetodoGet[0].usr_cod)
    this.G_variables.g_nemp=(resultadoMetodoGet[0].emp_cod)

  if(this.l_user ===this.G_variables.g_user && this.l_pass===this.G_variables.g_pass){

    console.log("nombre Empreza",this.G_variables.g_nemp)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Bienvenido  '+this.G_variables.g_user,
      showConfirmButton: false,
      timer: 1500,
    });
    let cokie=this.cookiesService.set('empresa',resultadoMetodoGet[0].emp_cod,4,'/')
  //alert('Bienvenido:'+cokie)
  this.router.navigate(
   [`/home/`+ this.G_variables.g_empid+'/'+ this.G_variables.g_nemp]

 )
}else if(resultadoMetodoGet.length<0){
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: 'Usuario o contraseña no existentes',
    showConfirmButton: false,
    timer: 1500,
  });
  //alert('Usuario o contraseña no existentes')

}


    });

}
}
