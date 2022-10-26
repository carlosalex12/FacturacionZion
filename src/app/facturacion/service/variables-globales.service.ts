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
cli_nid:"",
cli_tid:"",
cli_dir:"",
cli_tlf1:0,
cli_tlf2:0,
cli_email:""


};
public g_DatosArt = {
art_cod:"",
art_est:"",
art_nom:"",
art_fkey:"",
art_treg:"",
uni_cod:"",
art_prec:0,
art_nomcorto:"",
emp_cod: ""

  };



  constructor() { }
}
