import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/GserviceGPPD';
import { VariablesFacturacion } from '../service/Variables-Facturacion';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-articulo-dialogo',
  templateUrl: './articulo-dialogo.component.html',
  styleUrls: ['./articulo-dialogo.component.css']
})
export class ArticuloDialogoComponent implements OnInit {
  l_Buscarticulo:any

  constructor
  (
    public dialoRef:MatDialogRef<ArticuloDialogoComponent>,
    private GlobalService:GlobalService,
    public gvariablesBus:VariablesFacturacion,
  ) { }

  ngOnInit(): void {
    var param='p_Emp='+
    this.gvariablesBus.g_IdEmp
    +'&p_Valor=' +
    this.gvariablesBus.gart_valor
    +'&p_Campo=' +
    this.gvariablesBus.gart_campo
    +'&p_Usr=' +
    this.gvariablesBus.g_idU

    this.GlobalService

    .metodoGet('https://localhost:7232/Articulo/BuscarArticulo?'+param).subscribe((res:any) => {
      this.l_Buscarticulo=res.result;
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
    art_pimpto:DatosArtSelc.art_pimpto,
    art_fkey:DatosArtSelc.art_fkey,
    art_treg:DatosArtSelc.art_treg,
    uni_cod:DatosArtSelc.uni_cod,
    art_nomcorto:DatosArtSelc.art_nomcorto,
    art_descrip:DatosArtSelc.art_descrip
    }

console.log(this.gvariablesBus.g_DatosArt)
this.dialoRef.close();
  }
}
