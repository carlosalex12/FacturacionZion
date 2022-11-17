import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { articulo } from '../model/articulo';
import { VariablesGlobalesService } from '../menu/serviceMenu/variables-globales.service';
import { GlobalService } from '../services/GserviceGPPD';
import Swal from 'sweetalert2';
import { ZzapplService } from '../FuncionesGlobales/zzappl.service';
import { ZzglobService } from '../FuncionesGlobales/zzglob.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaDialogoComponent } from './categoria-dialogo/categoria-dialogo.component';
import { VariableClase } from './Variables';
import { UnidaDialogoComponent } from './unida-dialogo/unida-dialogo.component';

declare const Nuevo: any;
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
  MostrarConsulta=true;
  MostrarCrud =false;
  a: any;
  flgAcc = '';
  dialogRef: any;
  consulta:any
  scampo:any;
  svalor:any;
  con:any
  displayedColumns: string[] = [
    'art_cod',
    'art_nom',
    'art_est',
    'art_prec',
    'art_nomcorto',
    'uni_cod',
    'ars_cod',
    'art_pimpto',
    'boton',
  ];
  constructor(
    private readonly _rutaDatos: ActivatedRoute,
    private GlobalService: GlobalService,
    private gvariables: VariablesGlobalesService,
    private Zzappl: ZzapplService,
    private zzglob: ZzglobService,
    public dialog: MatDialog,
    public Variables:VariableClase
  ) {}

  openDialogoDetalle() {
    this.dialogRef = this.dialog.open(CategoriaDialogoComponent);
    this.dialogRef.afterClosed().subscribe((result: any) => {
      let id = document.getElementById('ars_cod');
      id?.focus();
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogoUnidad() {
    this.dialogRef = this.dialog.open(UnidaDialogoComponent);
    this.dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);

    });
  }
  precionarbotonf4(event: any , camp:any) {
    if(camp=="ars_cod"){
      if (event.keyCode == 115) {

        return this.openDialogoDetalle();
      } else if (event.keyCode == 27) {
        this.dialogRef.afterClosed().subscribe((result: any) => {
          console.log(`Dialog result: ${result}`);
        });
      }

    }
    if (event.keyCode == 115) {

      return this.openDialogoUnidad();
    } else if (event.keyCode == 27) {
      this.dialogRef.afterClosed().subscribe((result: any) => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
  ngOnInit(): void {
    this.gvariables.g_empid = {
      id: this._rutaDatos.snapshot.params,
    };
    this.gvariables.g_nemp = {
      emp: this._rutaDatos.snapshot.params,
    };
    //console.log("empresaa es:",this.gvariables.g_nemp.emp.emp);

    this.ondatatable();
  }

  ondatatable() {
    this.GlobalService.metodoGet(
      this.zzglob.creaurl('Articulo', this.zzglob.metodo.Select) + this.gvariables.g_empid.id.id
    ).subscribe((res: any) => {
      this.datatable = res.result;
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
  onInsert() {
  //  console.log(this.articulo);
    this.articulo.ars_cod=this.Variables.gDatosClase.ars_cod
    this.articulo.uni_cod=this.Variables.gDatosUnidad.uni_cod
    this.GlobalService.metodoPost(this.zzglob.creaurl('Articulo', this.zzglob.metodo.Insert)
    +this.gvariables.g_empid.id.id,this.articulo
    ).subscribe((res:any) => {
      if(res.success==true ){
        this.zzglob.mensaje('success', res.message);
        this.Cancelar();
        //console.log(resultado);
      }else{
        this.zzglob.mensaje('error',res.message)
      }

    });
  }
  onSetData(select: any) {
    this.articulo.art_cod = select.art_cod;
    this.articulo.art_nom = select.art_nom;
    this.articulo.art_est = select.art_est;
    this.articulo.art_prec = select.art_prec;
    this.articulo.art_pimpto = select.art_pimpto;
    this.articulo.uni_cod = select.uni_cod;
    this.articulo.art_nom1 = select.art_nomcorto;
    this.articulo.emp_cod = select.emp_cod;
  }

  onUpdate() {
    this.GlobalService.metodoPut(this.zzglob.creaurl('Articulo', this.zzglob.metodo.Update)
    +this.gvariables.g_empid.id.id,this.articulo
    ).subscribe((res:any) => {
      if(res.success==true){
        this.zzglob.mensaje('success',res.message);
        console.log(res);

        this.Cancelar();
      }else{
        this.zzglob.mensaje('error',res.message)
      }

    });

    this.SelecActualizar = true;
  }
  ///Eliminar
  onDeleteArticulo(articulo: articulo): void {
    this.GlobalService.metodoDelete(
      'https://localhost:7232/Articulo/Eliminar/' +
        this.articulo.art_cod +
        ',' +
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
    this.articulo.art_cod = '';
    (this.articulo.art_nom = ''),
    (this.articulo.art_pimpto = 0),
    (this.articulo.art_nom1 = ''),
    (this.articulo.art_prec = 0),
    (this.articulo.uni_cod = ''),
    (this.articulo.art_nom1 = '');
  }

  foucusArticulo(idCamp: any) {
    //alert('focus'+idCamp)
    this.scampo = document.getElementById(''+idCamp+'')
    this.svalor = this.scampo.value
    var lparam='p_Emp='+this.gvariables.g_nemp.emp.emp
      +'&p_Campo=' + idCamp
      +'&p_Valor=' + this.svalor
      +'&p_Usr=' + this.gvariables.g_empid.id.id

   if(idCamp ==="uni_cod"){
      this.GlobalService.metodoGet(
    'https://localhost:7232/ArtClase/ExistenciaUnidad?'+lparam
    ).subscribe((res: any) => {
      console.log(res);
      if(res.result.length==0){
        let tmpcod=this.svalor
        this.zzglob.mensaje('error',' La Unidad No  Existente')
        this.scampo = document.getElementById(''+idCamp+'')
        this.scampo.placeholder=tmpcod
        this.articulo.uni_cod=""
      }
        });
    }if(idCamp=="ars_cod"){
      this.GlobalService.metodoGet(
        'https://localhost:7232/ArtClase/ExistenciaArtClase?'+lparam
      ).subscribe((res: any) => {
        if(res.result.length==0){
          let tmpcod=this.svalor
          this.zzglob.mensaje('error','  La Clase  No Existe')
          this.scampo = document.getElementById(''+idCamp+'')
          this.scampo.placeholder=tmpcod
          this.articulo.ars_cod=""
        }

          });
    }
  }
  InicializarCampos() {
    //alert('inicializar campos ');
    this.articulo.art_cod = '0';
    this.articulo.art_est = 'ACT';
    this.articulo.emp_cod=this.gvariables.g_nemp.emp.emp
  }
  Nuevo() {
   this.MostrarConsulta = false;
   this.MostrarCrud = true;
    this.flgAcc = 'nuevo';
    this.clear()
    this.InicializarCampos();
  }
  Actualizar() {
    // alert('funcion Actualizar');
    this.MostrarConsulta = false;
    this.MostrarCrud = true;
    this.flgAcc = 'actualizar';
  }

  lAntesGuardar(val: any) {
    return true;
  }
  Guardar(documen: any): any {
    //console.log(this.articulo);
    if (this.Zzappl.gGuardar(documen) == false) {return false;}
    if (this.flgAcc == 'nuevo') { this.onInsert();} else {this.onUpdate();}
  }

  Cancelar() {
    this.MostrarConsulta = true;
    this.MostrarCrud = false
    this.clear()
    this.ondatatable()
  }
}
