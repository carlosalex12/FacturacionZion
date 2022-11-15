import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesFacturacion {
g_idU=""
g_IdEmp=""
//factura
g_fac_num=0
g_fac_doc=""
g_fac_desc=0
g_fac_iva=0
//Cliente//
g_cli_dato=""
g_cli_tid=""
//Articulo
gart_campo=""
gart_valor=""
g_artcod=""
g_artnom=""
g_total=0
g_iva=0
g_dec=0
gsubtotal=0
gsubtotal1=0
gsubtotal0=0

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
art_pimpto:0,
art_nomcorto:"",
emp_cod: "",
art_descrip:""

  };



  constructor() { }
}
