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
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  cliente: clientes = new clientes();
  datatable: any = [];
  datocli:any
  l_tmpCli_cod=""
  l_BusCientes:any
  l_tmpCli_nom=""
  SelecActualizar = true;
  check:any
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
    public gvariables: VariablesGlobalesService
  ) {}

  ngOnInit(): void {
    console.log('nombre');

    this.gvariables.g_empid = {
      id: this._rutaDatos.snapshot.params,
    };
    this.gvariables.g_nemp = {
      emp: this._rutaDatos.snapshot.params,
    };
    console.log("empresaaa",this.gvariables.g_nemp.emp.emp);
    this.ondatatable();


  }



  foucuscliente(idCamp: any) {
    if (idCamp.id == 'idcli_cod') {
      if (this.cliente.cli_cod == '') {
        this.datocli = document.getElementById('idcli_cod');
        this.datocli.placeholder = this.l_tmpCli_cod;
        //this.Fcli_cod = this.l_tmpCli_cod;
      } else {
        this.GlobalService.metodoGet(
          `https://localhost:44381/Cliente/GetBuscar?p_id=` +
          this.cliente.cli_cod +
            `&p_pmt=` +
            this.cliente.cli_nom+
            `&p_usr=` +
            this.gvariables.g_empid.id.id
        ).subscribe((res: any) => {
          this.l_BusCientes = res;
          //console.log(this.l_BusCientes);
          if (this.l_BusCientes.length > 0) {
           // alert('EL CODIDO DEL CLIENTE YA  EXISTE');
           Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'EL CODIDO DEL CLIENTE YA  EXISTE',
            footer: ''
          })
            this.l_tmpCli_cod = this.cliente.cli_cod;
            this.cliente.cli_cod = '';
            let id = document.getElementById('idcli_cod');
            id?.focus();
          }
        });
      }
    } else if (idCamp.id == 'idcli_ni') {
      if (this.cliente.cli_nid == '') {
        this.datocli = document.getElementById('idcli_ni');
        this.datocli.placeholder = this.l_tmpCli_nom;
        //this.Fcli_nom = this.l_tmpCli_nom;
      } else {
        this.GlobalService.metodoGet(
          `https://localhost:44381/Cliente/GetBuscar?p_id=` +
          this.cliente.cli_cod+
            `&p_pmt=` +
            this.cliente.cli_nid+
            `&p_usr=` +
            this.gvariables.g_empid.id.id
        ).subscribe((res: any) => {
          this.l_BusCientes = res;
          //console.log(this.l_BusCientes);
          if (this.l_BusCientes.length > 0) {
            //alert('Cliente YA EXISTE Existe');
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'EL CLIENTE YA  EXISTE',
              footer: ''
            })
            this.l_tmpCli_nom = this.cliente.cli_nid ;
            this.cliente.cli_nid  = '';
            let id = document.getElementById('idcli_ni');
            id?.focus();
          }
        });
      }
    }
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
      //console.log(res);
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
    this.SelecActualizar=false
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
  OnAddCliente(Cliente:clientes): void {
    if (
      Cliente.cli_cod == '' ||
      Cliente.cli_email == '' ||
      Cliente.cli_tlf1 == 0 ||
      Cliente.cli_nom == ''
    ) {

      //alert('LLENE LOS CAMPOS PARA PODER AGREGAR');
      Swal.fire({
        title: '<strong>CAMPOS VASIOS</strong>',
        icon: 'info',
        html:
          'Debe llenar los campos' +
          'Para Poder ' +
          'Agregar Un Cliente',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
      })
    } else {
      console.log(this.gvariables.g_nemp);

      this.GlobalService.metodoPost('https://localhost:44381/Cliente/Add?p_usr='+this.gvariables.g_empid.id.id,

    {
      emp_cod:this.gvariables.g_nemp.emp.emp,
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
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Cliente Agregado',
      showConfirmButton: false,
      timer: 1500
    })

    this.ondatatable();
    this.clear();
    //console.log(resultado);
  });
    }



  }

  ///actualizar
  onUpdateCliente(cliente: clientes): void {
    console.log(this.gvariables.g_nemp);

    this.GlobalService.metodoPut(
      'https://localhost:44381/Cliente/Put?p_usr=' +
        this.gvariables.g_empid.id.id,
      {
        emp_cod: this.gvariables.g_nemp.emp.emp,
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
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Cliente Actualizado',
        showConfirmButton: false,
        timer: 1500
      })
      this.ondatatable();
      this.clear();
      console.log(resultado);
    });
    this.SelecActualizar=true
  }

  ///Eliminar
  onDeleteCliente(cliente: clientes): void {
    this.GlobalService.metodoDelete(
      'https://localhost:44381/Cliente/Delete?p_id='+cliente.cli_cod+'&p_usr=' +
        this.gvariables.g_empid.id.id,

    ).subscribe((resultado) => {
      Swal.fire({
        title: 'ESTAS SEGURO ?',
        text: "Eliminaras  El Cliente Seleccionado",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'CLIENTE ELIMINADO!',
            '',
            'success'
          )
        }
      })
      this.ondatatable();
      this.clear();
      console.log(resultado);
    });
    this.SelecActualizar=true
  }
  ///
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
    this.ondatatable();
    this.SelecActualizar = true;
  }
}
