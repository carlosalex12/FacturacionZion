import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ArticuloDialogoComponent } from 'src/app/facturacion/articulo-dialogo/articulo-dialogo.component';
import { ZzglobService } from 'src/app/FuncionesGlobales/zzglob.service';
import { VariablesGlobalesService } from 'src/app/menu/serviceMenu/variables-globales.service';
import { articulo } from 'src/app/model/articulo';
import { GlobalService } from 'src/app/services/GserviceGPPD';
import { VariableClase } from '../Variables';

@Component({
  selector: 'app-categoria-dialogo',
  templateUrl: './categoria-dialogo.component.html',
  styleUrls: ['./categoria-dialogo.component.css']
})
export class CategoriaDialogoComponent implements OnInit {
  datatable:any
  articulo: articulo = new articulo();
  constructor(  public dialoRef:MatDialogRef<ArticuloDialogoComponent>,
    private GlobalService:GlobalService,
     private zzglob:ZzglobService,
     public gvariable: VariablesGlobalesService,
     public VariableClase:VariableClase
    ) { }

  ngOnInit(): void {

    this.GlobalService.metodoGet(
      this.zzglob.creaurl('ArtClase/Clase',this.zzglob.metodo.Select) + this.gvariable.g_empid.id.id
    ).subscribe((res: any) => {
      this.datatable = res.result;
      console.log(this.datatable);

    });
  }

  Select(datos:any){
   this.VariableClase.gDatosClase.ars_cod=datos.ars_cod
    this.dialoRef.close(this.VariableClase.gDatosClase.ars_cod);
  }
}
