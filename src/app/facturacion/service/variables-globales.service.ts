import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesGlobalesBusqueda {
g_idU=""
//Cliente//
g_clicod=""
g_clinom=""
//Articulo
g_artcod=""
g_artnom=""
g_total=0
gsubtotal=0
public g_DatosCli = {
emp_cod:"",
cli_cod:"",
cli_nom:"",
cli_est:"",
ccl_cod:""
};
public g_DatosArt = {
art_cod:"",
art_est:"",
art_nom:"",
art_prec:0,
car_cod:"",
emp_cod: ""

  };



  constructor() { }
}
