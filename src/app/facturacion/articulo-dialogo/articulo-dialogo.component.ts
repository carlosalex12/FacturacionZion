import { Component, OnInit } from '@angular/core';
import { VariablesGlobalesService } from 'src/app/menu/serviceMenu/variables-globales.service';
import { Facturacion } from 'src/app/model/Facturacion';
import { GlobalService } from 'src/app/services/GserviceGPPD';
import { VariablesGlobalesBusqueda } from '../service/variables-globales.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-articulo-dialogo',
  templateUrl: './articulo-dialogo.component.html',
  styleUrls: ['./articulo-dialogo.component.css']
})
export class ArticuloDialogoComponent implements OnInit {
  l_Buscarticulo:any
  factura:Facturacion = new Facturacion();
  constructor
  (
    public dialoRef:MatDialogRef<ArticuloDialogoComponent>,
    private GlobalService:GlobalService,
    private gvariables:VariablesGlobalesService,
    public gvariablesBus:VariablesGlobalesBusqueda,
  ) { }

  ngOnInit(): void {

    this.GlobalService

    .metodoGet(`https://localhost:44381/Articulo/GetId?p_id=`+this.gvariablesBus.g_artcod+`&p_nom=`+this.gvariablesBus.g_artnom+`&p_usr=`+this.gvariablesBus.g_idU)
    .subscribe((res:any) => {
      this.l_Buscarticulo=res;
      console.log(this.l_Buscarticulo)
    });

  }
cliSelect(DatosArtSelc:any){



  this.gvariablesBus.g_DatosArt={
    emp_cod:DatosArtSelc.emp_cod,
    art_cod:DatosArtSelc.art_cod,
    art_est:DatosArtSelc.art_est,
    art_nom:DatosArtSelc.art_nom,
    art_prec:DatosArtSelc.art_prec,
    art_fkey:DatosArtSelc.art_fkey,
    art_treg:DatosArtSelc.art_treg,
    uni_cod:DatosArtSelc.uni_cod,
    art_nomcorto:DatosArtSelc.art_nomcorto,
    }

console.log(this.gvariablesBus.g_DatosArt)
this.dialoRef.close();
  }
}
