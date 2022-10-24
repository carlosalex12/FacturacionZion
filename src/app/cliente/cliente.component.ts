import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { articulo } from '../model/articulo';
import { Router } from '@angular/router';
import { VariablesGlobalesService } from '../menu/serviceMenu/variables-globales.service';
import { clientes } from '../model/cliente';
import { GlobalService } from '../services/GserviceGPPD';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  emp_cod: string = '';

  cli_cod: string = '';

  cli_nom: string = '';

  cli_est: string = '';

  ccl_cod: string = '';

  cliente: clientes = new clientes();
  datatable: any = [];
  displayedColumns: string[] = [
    'emp_cod',
    'cli_cod',
    'cli_nom',
    'cli_est',
    'ccl_cod',
    'boton',
  ];
  constructor(
    private readonly _rutaDatos: ActivatedRoute,
    private _router: Router,
    private GlobalService: GlobalService,
    private gvariables: VariablesGlobalesService
  ) {}

  ngOnInit(): void {
    console.log('nombre');

    this.gvariables.g_empid = {
      id: this._rutaDatos.snapshot.params,
    };
    this.ondatatable();
  }

  ///TRAER DATOS
  ondatatable() {
    this.GlobalService.metodoGet(
      `https://localhost:44381/Cliente/GetAll?p_usr=` +
        this.gvariables.g_empid.id.id
    ).subscribe((res: any) => {
      this.datatable = res;

      ///datasource si iguala ala respuesta del get para imprimir los datos
      this.dataSource.data = this.datatable;
      console.log(res);
    });
  }

  dataSource = new MatTableDataSource<articulo>(this.datatable.Data);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  //FILTRO
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //MOSTRAR DATOS
  onSetData(select: any) {
    this.cliente.emp_cod = select.emp_cod;
    this.cliente.cli_cod = select.cli_cod;
    this.cliente.cli_nom = select.cli_nom;
    this.cliente.cli_est = select.cli_est;
    this.cliente.ccl_cod = select.ccl_cod;
  }

  //INGRESAR
  OnAddCliente(Cliente: clientes): void {
    console.log(this.gvariables.g_empid.id.id);
    this.GlobalService.metodoPost(
      'https://localhost:44373/Cliente/Insertar?usuario=' +
        this.gvariables.g_empid.id.id,

      {
        emp_cod: this.cliente.emp_cod,
        cli_cod: this.cliente.cli_cod,
        cli_nom: this.cliente.cli_nom,
        cli_est: this.cliente.cli_est,
        ccl_cod: 'c01',
      }
    ).subscribe((resultado) => {
      alert('CLIENTE AÑADIDO');
      this.ondatatable();
      this.clear();
      console.log(resultado);
    });
  }

  ///actualizar
  onUpdateCliente(cliente: clientes): void {
    this.GlobalService.metodoPut(
      'https://localhost:44373/Cliente/Actualizar?usuario=' +
        this.gvariables.g_empid.id.id,
      {
        cli_cod: this.cliente.cli_cod,
        cli_nom: this.cliente.cli_nom,
        cli_est: this.cliente.cli_est,
        ccl_cod: this.cliente.ccl_cod,
      }
    ).subscribe((resultado) => {
      alert('ARTICULO ACTUALIZADO');
      this.ondatatable();
      this.clear();
      console.log(resultado);
    });
  }

  ///Eliminar
  onDeleteCliente(cliente: clientes): void {
    this.GlobalService.metodoPut(
      'https://localhost:44373/Cliente/Eliminar?usuario=' +
        this.gvariables.g_empid.id.id,
      {
        cli_cod: this.cliente.cli_cod,
      }
    ).subscribe((resultado) => {
      alert('ARTICULO ELIMINADO');
      this.ondatatable();
      this.clear();
      console.log(resultado);
    });
  }
  ///

  regresar() {
    console.log(this.gvariables.g_empid);
    this._router.navigate([`/home/` + this.gvariables.g_empid.id.id]);
  }
  //borrar campos
  clear() {
    this.cliente.emp_cod = '';
    this.cliente.cli_cod = '';
    this.cliente.cli_nom = '';
    this.cliente.cli_est = '';
    this.cliente.ccl_cod = '';
  }
}
