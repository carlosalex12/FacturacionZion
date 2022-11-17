import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZzapplService } from 'src/app/FuncionesGlobales/zzappl.service';
import { ZzglobService } from 'src/app/FuncionesGlobales/zzglob.service';
import { VariablesGlobalesService } from 'src/app/menu/serviceMenu/variables-globales.service';
import { GlobalService } from 'src/app/services/GserviceGPPD';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.css']
})
export class BodegaComponent implements OnInit {
  datatable: any = [];
  displayedColumns: string[] = [
    'emp_cod',
    'bod_cod',
    'bod_nom',
    'bod_est',
    'suc_cod',
  ];
  constructor(
    private readonly _rutaDatos: ActivatedRoute,
    private GlobalService: GlobalService,
    private gvariables: VariablesGlobalesService,
    private Zzappl:ZzapplService,
    private zzglob:ZzglobService
  ) { }

  ngOnInit(): void {
    this.gvariables.g_empid = {
      id: this._rutaDatos.snapshot.params,
    };
    this.ondatatable();
  }
  ondatatable() {
    this.GlobalService.metodoGet(this.zzglob.creaurl('Catalogo/Bodega',this.zzglob.metodo.Select)+this.gvariables.g_empid.id.id
     ).subscribe((res: any) => {
      this.datatable = res.result;
      console.log(res.Data);
    });
  }
}
