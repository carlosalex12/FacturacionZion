import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { articulo } from '../model/articulo';
import { Router } from '@angular/router';
import { VariablesGlobalesService } from '../menu/serviceMenu/variables-globales.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { GlobalService } from '../services/GserviceGPPD';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css'],
})
export class ArticuloComponent implements OnInit {
  SelecActualizar = true;
  articulo: articulo = new articulo();
  datatable: any = [];
  l_check = 1;
  l_Buscarticulo: any;
  l_tmpart_cod = '';
  l_tmpart_nom = '';
  datosart: any;
  displayedColumns: string[] = [
    'art_cod',
    'art_nom',
    'art_est',
    'art_prec',
    'art_nomcorto',
    'uni_cod',
    'art_pimpto',
    'boton',
  ];
  constructor(
    private readonly _rutaDatos: ActivatedRoute,
    private _router: Router,
    private GlobalService: GlobalService,
    private gvariables: VariablesGlobalesService,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.gvariables.g_empid = {
      id: this._rutaDatos.snapshot.params,
    };
    this.gvariables.g_nemp = {
      emp: this._rutaDatos.snapshot.params,
    };
    console.log('empresasss', this.gvariables.g_nemp.emp.emp);

    this.ondatatable();
  }

  ondatatable() {
    this.GlobalService.metodoGet(
      `https://localhost:44381/Articulo/GetAll?p_usr=` +
        this.gvariables.g_empid.id.id
    ).subscribe((res: any) => {
      this.datatable = res;

      ///datasource si iguala ala respuesta del get para imprimir los datos
      this.dataSource.data = this.datatable;
      console.log(res.Data);
    });
  }
  dataSource = new MatTableDataSource<articulo>(this.datatable.Data);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  check: any;
  onSetData(select: any) {
    this.SelecActualizar = false;
    this.articulo.art_cod = select.art_cod;
    this.articulo.art_nom = select.art_nom;
    this.articulo.art_est = select.art_est;
    this.articulo.art_prec = select.art_prec;
    this.articulo.art_pimpto = select.art_pimpto;
    this.articulo.uni_cod = select.uni_cod;
    this.articulo.art_nomcorto = select.art_nomcorto;
    this.articulo.emp_cod = select.emp_cod;
  }

  ///ingresar articuloss
  cancelar() {
    this.ondatatable();
    this.SelecActualizar = true;
  }
  OnAddusuario(Articulo: articulo): void {
    if (
      Articulo.art_cod == '' ||
      Articulo.art_est == '' ||
      Articulo.art_prec == 0 ||
      Articulo.uni_cod == '' ||
      Articulo.art_nom == '' ||
      Articulo.art_nomcorto == ''
    ) {
      //alert('LLENE LOS CAMPOS PARA PODER AGREGAR');
      Swal.fire({
        title: '<strong>CAMPOS VASIOS</strong>',
        icon: 'info',
        html:
          'Debe llenar los campos' +
          'Para Poder' +
          'Agregar Un Articulo',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
      })
    } else {

      this.GlobalService.metodoPost(
        '' +
          this.GlobalService.creaURLInsert('Articulo') +
          '' +
          this.gvariables.g_empid.id.id,

        {
          emp_cod: this.gvariables.g_nemp.emp.emp,
          art_cod: this.articulo.art_cod,
          art_nom: this.articulo.art_nom,
          art_est: this.articulo.art_est,
          uni_cod: this.articulo.uni_cod,
          art_prec: this.articulo.art_prec,
          art_pimpto: this.articulo.art_pimpto,
          art_nomcorto: this.articulo.art_nomcorto,
        }
      ).subscribe((resultado) => {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Articulo Agregado',
          showConfirmButton: false,
          timer: 1500
        })
        this.ondatatable();
        this.clear();
        console.log(resultado);
      });
    }
  }

  onUpdateArticulo(Articulo: articulo) {
    this.GlobalService.metodoPut(
      'https://localhost:44381/Articulo/Put?p_usr=' +
        this.gvariables.g_empid.id.id,
      {
        emp_cod: this.gvariables.g_nemp.emp.emp,
        art_cod: this.articulo.art_cod,
        art_nom: this.articulo.art_nom,
        art_est: this.articulo.art_est,
        art_fkey: this.articulo.art_fkey,
        art_treg: this.articulo.art_treg,
        uni_cod: this.articulo.uni_cod,
        art_prec: this.articulo.art_prec,
        art_pimpto: this.articulo.art_pimpto,
        art_nomcorto: this.articulo.art_nomcorto,
      }
    ).subscribe((resultado) => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Articulo Actualizado',
        showConfirmButton: false,
        timer: 1500
      })
      this.check = document.getElementById('checkid');
      this.check.value = '';
      this.ondatatable();
      this.clear();
      console.log(resultado);
    });

    this.SelecActualizar = true;
  }
  ///Eliminar
  onDeleteArticulo(articulo: articulo): void {
    this.GlobalService.metodoDelete(
      'https://localhost:44381/Articulo/Delete?p_id=' +
        articulo.art_cod +
        '&p_usr=' +
        this.gvariables.g_empid.id.id
    ).subscribe((resultado) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'ARTICULO ELIMINADO',
        showConfirmButton: false,
        timer: 1500,
      });
      this.ondatatable();
      this.clear();
      console.log(resultado);
    });
    this.SelecActualizar = true;
  }
  ///

  clear() {
    this.articulo.art_cod = "";
    this.articulo.art_nom = "",
    this.articulo.art_pimpto = 0,
    this.articulo.art_nomcorto = "",
    this.articulo.art_prec = 0,
    this.articulo.uni_cod = "",
    this.articulo.art_nomcorto = "";
    this.ondatatable();
    this.SelecActualizar = true;
  }

  foucusArticulo(idCamp: any) {
    if (idCamp.id == 'idart_cod') {
      if (this.articulo.art_cod == '') {
        this.datosart = document.getElementById('idart_cod');
        this.datosart.placeholder = this.l_tmpart_cod;
        //this.fart_cod = this.l_tmpart_cod;
      } else {
        this.GlobalService.metodoGet(
          `https://localhost:44381/Articulo/GetExistencia?p_id=` +
            this.articulo.art_cod +
            `&p_nom=` +
            this.articulo.art_nom +
            `&p_usr=` +
            this.gvariables.g_empid.id.id
        ).subscribe((res: any) => {
          this.l_Buscarticulo = res;
          console.log(this.l_Buscarticulo);
          if (this.l_Buscarticulo.length > 0) {
           // alert('EL CODIGO  YA  EXISTE ');
           Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'EL CODIGO  YA  EXISTE',
            footer: ''
          })
            this.l_tmpart_cod = this.articulo.art_cod;
            this.articulo.art_cod = '';
            let id = document.getElementById('idart_cod');
            id?.focus();
          } else {
          }
        });
      }
    } else if (idCamp.id == 'idart_nom') {
      if (this.articulo.art_nom == '') {
        this.datosart = document.getElementById('idart_nom');
        this.datosart.placeholder = this.l_tmpart_nom;
        //this.fart_nom = this.l_tmpart_nom;
      } else {
        this.GlobalService.metodoGet(
          `https://localhost:44381/Articulo/GetExistencia?p_id=` +
            this.articulo.art_cod +
            `&p_nom=` +
            this.articulo.art_nom +
            `&p_usr=` +
            this.gvariables.g_empid.id.id
        ).subscribe((res: any) => {
          this.l_Buscarticulo = res;
          console.log(this.l_Buscarticulo);
          if (this.l_Buscarticulo.length > 0) {
            //alert('EL NOMBRE  YA EXISTE ');
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'EL CODIGO  YA  EXISTE',
              footer: ''
            })
            this.l_tmpart_nom = this.articulo.art_nom;
            this.articulo.art_nom = '';
            let id = document.getElementById('idart_nom');
            id?.focus();
          } else {
          }
        });
      }
    }
  }
}
