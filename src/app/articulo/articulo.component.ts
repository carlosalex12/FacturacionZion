import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { articulo } from '../model/articulo';
import { Router } from '@angular/router';
import { VariablesGlobalesService } from '../menu/serviceMenu/variables-globales.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { GlobalService } from '../services/GserviceGPPD';
@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  l_nombreEs = "";
  art_cod = "";
  art_est = "";
  art_nom = "";
  art_prec = 0;
  car_cod = "";
  emp_cod = "";
  l_tabla = "cliente"
  l_urlist = ""

  articulo: articulo = new articulo();
  datatable: any = [];
  displayedColumns: string[] = ['art_cod', 'art_est', 'art_nom', 'art_prec', 'car_cod', 'emp_cod', 'car_nom', 'boton'];
  
  constructor(
    private readonly _rutaDatos: ActivatedRoute,
    private _router: Router,
    private GlobalService: GlobalService,
    private gvariables: VariablesGlobalesService,
    private _bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit(): void {
    this.l_nombreEs = this.gvariables.g_user
    console.log('nombre')
    console.log(this.l_nombreEs)
    this.gvariables.g_empid = {
      id: this._rutaDatos.snapshot.params
    };
    this.ondatatable();
  }


  ondatatable() {
       this.GlobalService
    .metodoGet(`https://localhost:44381/Articulo/GetAll?p_usr=` + this.gvariables.g_empid.id.id)
    .subscribe((res: any) => {
        this.datatable = res;
        this.dataSource.data = this.datatable  //datasource si iguala ala respuesta del get para imprimir los datos
        console.log(res);
    });
  }

  dataSource = new MatTableDataSource<articulo>(this.datatable);//.Data
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onSetData(select: any) {
    this.articulo.art_cod = select.art_cod;
    this.articulo.art_est = select.art_est;
    this.articulo.art_nom = select.art_nom;
    this.articulo.art_prec = select.art_prec;
    this.articulo.car_cod = select.car_cod;
    this.articulo.emp_cod = select.emp_cod;
  }

  ///ingresar articuloss

  OnAddusuario(Articulo: articulo): void {
    this.l_urlist = this.GlobalService
      .creainser(this.l_tabla)

    console.log(this.gvariables.g_empid.id.id)


    this.GlobalService


      .metodoPost('' + this.l_urlist + '' + this.gvariables.g_empid.id.id,

        {
          emp_cod: this.articulo.emp_cod,
          art_cod: this.articulo.art_cod,
          art_nom: this.articulo.art_nom,
          art_est: this.articulo.art_est,
          car_cod: this.articulo.car_cod,
          art_prec: this.articulo.art_prec
        }


      )
      .subscribe((resultado) => {

        alert('ARTICULO AÑADIDO')
        this.ondatatable();
        this.clear();
        console.log(resultado);

      })

  }

  ///actualizar articulo
  onUpdateArticulo(articulo: articulo): void {
    this.GlobalService
      .metodoPut(`https://localhost:44381/Articulo/Put?p_usr=` + this.gvariables.g_empid.id.id, {
        art_cod: this.articulo.art_cod,
        art_nom: this.articulo.art_nom,
        art_est: this.articulo.art_est,
        car_cod: this.articulo.car_cod,
        art_prec: this.articulo.art_prec
      })
      .subscribe((resultado) => {

        alert('ARTICULO ACTUALIZADO')
        this.ondatatable();
        this.clear();
        console.log(resultado);

      })
  }
  ///Eliminar
  onDeleteArticulo(articulo: articulo): void {
    this.GlobalService
      .metodoPut(`https://localhost:44381/Articulo/Delete?p_usr=` + this.gvariables.g_empid.id.id, {
        art_cod: this.articulo.art_cod,
      })
      .subscribe((resultado) => {

        alert('ARTICULO ELIMINADO')
        this.ondatatable();
        this.clear();
        console.log(resultado);

      })
  }
  ///

  regresar() {
    console.log(this.gvariables.g_empid)
    this._router.navigate(


      [`/home/` + this.gvariables.g_empid.id.id]

    )

  }

  clear() {
    this.articulo.art_cod = '',
    this.articulo.art_nom = '',
    this.articulo.art_est = '',
    this.articulo.car_cod = '',
    this.articulo.art_prec = 0
  }

}
