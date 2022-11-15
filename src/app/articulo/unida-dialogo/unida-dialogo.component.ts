import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ArticuloDialogoComponent } from 'src/app/facturacion/articulo-dialogo/articulo-dialogo.component';
import { ZzglobService } from 'src/app/FuncionesGlobales/zzglob.service';
import { VariablesGlobalesService } from 'src/app/menu/serviceMenu/variables-globales.service';
import { GlobalService } from 'src/app/services/GserviceGPPD';
import { VariableClase } from '../Variables';

@Component({
  selector: 'app-unida-dialogo',
  templateUrl: './unida-dialogo.component.html',
  styleUrls: ['./unida-dialogo.component.css']
})
export class UnidaDialogoComponent implements OnInit {
  datatable:any
  constructor(
     public dialoRef:MatDialogRef<ArticuloDialogoComponent>,
     private GlobalService:GlobalService,
     private zzglob:ZzglobService,
     public gvariable: VariablesGlobalesService,
     public Variables:VariableClase

  ) { }

  ngOnInit(): void {
    this.GlobalService.metodoGet(
      this.zzglob.creaurl('ArtClase/Unidad',this.zzglob.metodo.Select) + this.gvariable.g_empid.id.id
    ).subscribe((res: any) => {
      this.datatable = res.result;
      console.log(this.datatable);

    });
  }
  Select(datos:any){
    this.Variables.gDatosUnidad.uni_cod=datos.uni_cod
     //console.log(this.VariableClase.g_DatosClase.ars_cod);
     this.dialoRef.close(this.Variables.gDatosUnidad.uni_cod);
   }

}
