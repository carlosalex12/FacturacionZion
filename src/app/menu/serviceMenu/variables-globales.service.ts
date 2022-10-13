import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesGlobalesService {
  //variables de la consultas alas tablas
  public g_empid:any
  public g_nemp:any
///Variables del formulario Login

  //

  public  g_user = '';
  public g_pass = '';

///variables de las rutas de las imagenes
public g_Lemp=""

  constructor() { }
}
