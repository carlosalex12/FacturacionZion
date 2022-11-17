import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { articulo } from '../model/articulo';
import { Router } from '@angular/router';
import { VariablesGlobalesService } from '../menu/serviceMenu/variables-globales.service';
import { clientes } from '../model/cliente';
import { GlobalService } from '../services/GserviceGPPD';
import Swal from 'sweetalert2';
import { ZzapplService } from '../FuncionesGlobales/zzappl.service';
import { ZzglobService } from '../FuncionesGlobales/zzglob.service';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  cliente: clientes = new clientes();
  datatable: any = [];
  datocli: any;
  l_tmpCli_cod = '';
  l_BusCientes: any;
  l_tmpCli_nom = '';
  SelecActualizar:any;
  check: any;
  MostrarConsulta = true;
  MostrarCrud = false;
  flgAcc = '';
  scampo:any;
  svalor:any;
  displayedColumns: string[] = [
    'cli_cod',
    'cli_nom',
    'cli_est',
    'cli_tlf1',
    'cli_tlf2',
    'cli_email',
    'boton',
  ];
  constructor(
    private readonly _rutaDatos: ActivatedRoute,
    private _router: Router,
    private GlobalService: GlobalService,
    public gvariables: VariablesGlobalesService,
    private Zzappl: ZzapplService,
    private zzglob: ZzglobService
  ) {}

  ngOnInit(): void {
    console.log('nombre');

    this.gvariables.g_empid = {
      id: this._rutaDatos.snapshot.params,
    };
    this.gvariables.g_nemp = {
      emp: this._rutaDatos.snapshot.params,
    };
    console.log('empresaaa', this.gvariables.g_nemp.emp.emp);
    this.ondatatable();
  }

  foucuscliente(idCamp: any) {
    this.scampo = document.getElementById(''+idCamp+'')
    this.svalor = this.scampo.value
    var lparam='p_Emp='+this.gvariables.g_nemp.emp.emp
      +'&p_Campo=' + idCamp
      +'&p_Valor=' + this.svalor
      +'&p_Usr=' + this.gvariables.g_empid.id.id
      this.GlobalService.metodoGet('https://localhost:7232/Cliente/ExistenciaCliente?'+lparam).subscribe((res: any) => {
        console.log(res.result);
if(res.result.length>0){
  let tmpcod=this.svalor
  this.zzglob.mensaje('error', 'El Cliente Ya Existe')
  this.scampo = document.getElementById(''+idCamp+'')
  this.scampo.placeholder=tmpcod
  this.cliente.cli_nid=0
}

      });
  }

  ///TRAER DATOS
  ondatatable() {
    this.GlobalService.metodoGet(this.zzglob.creaurl('Cliente',this.zzglob.metodo.Select)+this.gvariables.g_empid.id.id
    ).subscribe((res:any) => {
      //console.log(res);
     this.datatable = res.result;
      ///datasource si iguala ala respuesta del get para imprimir los datos
      this.dataSource.data = this.datatable;
      //console.log(res);
    });
  }

  dataSource = new MatTableDataSource<clientes>(this.datatable.Data);
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
  cancelar() {
    this.ondatatable();
    this.SelecActualizar = true;
  }
  //INGRESAR
  onInsert(): void {
  //console.log(this.cliente);
    this.GlobalService.metodoPost(this.zzglob.creaurl('Cliente',this.zzglob.metodo.Insert)
    +this.gvariables.g_empid.id.id,this.cliente
    ).subscribe((res:any) => {
      console.log(res);
      if(res.success==true){
        this.zzglob.mensaje('success',res.message);
        this.ondatatable();
        this.clear();
        this.Cancelar();
      }else{
        this.zzglob.mensaje('error',res.message);
      }


    });
  }

  ///actualizar
  onUpdate(): void {
   // console.log(this.gvariables.g_nemp);

   this.GlobalService.metodoPut(this.zzglob.creaurl('Cliente', this.zzglob.metodo.Update)
   +this.gvariables.g_empid.id.id,this.cliente
   ).subscribe((res:any) => {
    if(res.success==true){
      this.zzglob.mensaje('success',res.message);
      this.ondatatable();
      this.clear();
      this.Cancelar();
    }else{
      this.zzglob.mensaje('error',res.message);
    }
    });
    this.SelecActualizar = true;
  }

  ///Eliminar
  onDeleteCliente(cliente: clientes): void {
    this.GlobalService.metodoDelete(
      'https://localhost:7232/Cliente/Eliminar/' +
        cliente.cli_cod +
        ',' +
        this.gvariables.g_empid.id.id
    ).subscribe((resultado) => {
      Swal.fire({
        title: 'ESTAS SEGURO ?',
        text: 'Eliminaras  El Cliente Seleccionado',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('CLIENTE ELIMINADO!', '', 'success');
        }
      });
      this.ondatatable();
      this.clear();
      console.log(resultado);
    });
    this.SelecActualizar = true;
  }
  InicializarCampos() {
    //alert('inicializar campos ');
    this.cliente.cli_cod = '0';
    this.cliente.cli_est = 'ACT';
    this.cliente.emp_cod=this.gvariables.g_nemp.emp.emp
  }
  Nuevo() {
    this.clear()
    this.MostrarConsulta = false;
    this.MostrarCrud = true;
    this.flgAcc = 'nuevo';
    this.InicializarCampos();
  }
  Actualizar() {
    // alert('funcion Actualizar');
    this.MostrarConsulta = false;
    this.MostrarCrud = true;
    this.flgAcc = 'actualizar';
  }

  lAntesGuardar(val: any) {
    this.Zzappl.gGuardar;
  }
  Guardar(documen: any): any {
    //alert('local guardar')
    if (this.Zzappl.gGuardar(documen) == false) {return false;}
    if (this.flgAcc == 'nuevo') {this.onInsert();} else {this.onUpdate();}
  }

  Cancelar() {
    //alert('uncion Cancelar');
    this.MostrarConsulta = true;
    this.MostrarCrud = false;
    this.clear()
  }

  //borrar campos
  clear() {
    this.cliente.emp_cod = '';
    this.cliente.cli_cod = '';
    this.cliente.cli_nom = '';
    this.cliente.cli_nid = 0;
    this.cliente.cli_tid = '';
    this.cliente.cli_dir = '';
    this.cliente.cli_tlf1 ='';
    this.cliente.cli_tlf2 = '';
    this.cliente.cli_email = '';
    this.SelecActualizar = true;
  }
}
