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
  cliente: clientes = new clientes();
  datatable: any = [];
  displayedColumns: string[] = [
    'emp_cod',
    'cli_cod',
    'cli_nom',
    'cli_est',
    'cli_tid',
    'cli_nid',
    'cli_dir',
    'cli_tlf1',
    'cli_tlf2',
    'cli_email',
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
    this.cliente.cli_tid = select.cli_tid;
    this.cliente.cli_nid = select.cli_nid;
    this.cliente.cli_dir = select.cli_dir;
    this.cliente.cli_tlf1 = select.cli_tlf1;
    this.cliente.cli_tlf2 = select.cli_tlf2;
    this.cliente.cli_email = select.cli_email;
  }

  //INGRESAR
  OnAddCliente(Cliente: clientes): void {
    console.log(this.gvariables.g_empid.id.id);
    this.GlobalService.metodoPost(''+this.GlobalService.creaURLInsert("Cliente")+'' +
        this.gvariables.g_empid.id.id,

      {
        emp_cod: this.cliente.emp_cod,
        cli_cod: this.cliente.cli_cod,
        cli_nom: this.cliente.cli_nom,
        cli_tid: this.cliente.cli_tid,
        cli_nid: this.cliente.cli_nid,
        cli_dir: this.cliente.cli_dir,
        cli_tlf1: this.cliente.cli_tlf1,
        cli_tlf2: this.cliente.cli_tlf2,
        cli_email: this.cliente.cli_email,
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
      'https://localhost:44381/Cliente/Put?p_usr=' +
        this.gvariables.g_empid.id.id,
      {
        emp_cod: this.cliente.emp_cod,
        cli_cod: this.cliente.cli_cod,
        cli_nom: this.cliente.cli_nom,
        cli_est: this.cliente.cli_est,
        cli_treg: this.cliente.cli_treg,
        cli_fkey: this.cliente.cli_fkey,
        cli_fing: this.cliente.cli_fing,
        cli_tid: this.cliente.cli_tid,
        cli_nid: this.cliente.cli_nid,
        cli_dir: this.cliente.cli_dir,
        cli_tlf1: this.cliente.cli_tlf1,
        cli_tlf2: this.cliente.cli_tlf2,
        cli_email: this.cliente.cli_email,

      }
    ).subscribe((resultado) => {
      alert('CLIENTE  ACTUALIZADO');
      this.ondatatable();
      this.clear();
      console.log(resultado);
    });
  }

  ///Eliminar
  onDeleteCliente(cliente: clientes): void {
    this.GlobalService.metodoDelete(
      'https://localhost:44381/Cliente/Delete?p_id='+cliente.cli_cod+'&p_usr=' +
        this.gvariables.g_empid.id.id,

    ).subscribe((resultado) => {
      alert('Cliente ELIMINADO');
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
    this.cliente.cli_nid = '';
    this.cliente.cli_tid = '';
    this.cliente.cli_dir = '';
    this.cliente.cli_tlf1 = 0;
    this.cliente.cli_tlf2 = 0;
    this.cliente.cli_email = '';
  }
}
