import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ZzapplService } from 'src/app/FuncionesGlobales/zzappl.service';
import { ZzglobService } from 'src/app/FuncionesGlobales/zzglob.service';
import { VariablesGlobalesService } from 'src/app/menu/serviceMenu/variables-globales.service';
import { articulo } from 'src/app/model/articulo';
import { clientes } from 'src/app/model/cliente';
import { GlobalService } from 'src/app/services/GserviceGPPD';
@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent implements OnInit {
  datatable: any = [];
  displayedColumns: string[] = [
    'uni_cod',
    'uni_nom',
    'uni_est',
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
    this.GlobalService.metodoGet(this.zzglob.creaurl('ArtClase/Unidad',this.zzglob.metodo.Select)+this.gvariables.g_empid.id.id
     ).subscribe((res: any) => {
      this.datatable = res.result;
      console.log(res.Data);
      this.dataSource.data = this.datatable;
    });
  }
  dataSource = new MatTableDataSource<clientes>(this.datatable.Data);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
