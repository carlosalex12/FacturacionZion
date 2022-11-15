import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { VariablesGlobalesService } from '../menu/serviceMenu/variables-globales.service';
import { GlobalService } from '../services/GserviceGPPD';
import Swal from 'sweetalert2';
import { ZzapplService } from '../FuncionesGlobales/zzappl.service';
import { ZzglobService } from '../FuncionesGlobales/zzglob.service';
import { empresa } from '../model/Empresa';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  MostrarConsulta=true
  MostrarCrud=false
  flgAcc=""
  empresa:empresa= new empresa()
  datatable: any = [];
  displayedColumns: string[] = [
    'emp_cod',
    'emp_nom',
    'emp_est',
    'emp_ruc',
    'emp_dir',
    'emp_tlf1',
    'emp_tlf2',
    'emp_fax',
    'emp_email',
    'boton'
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
    this.gvariables.g_nemp = {
      emp: this._rutaDatos.snapshot.params,
    };
    //console.log("empresaa es:",this.gvariables.g_nemp.emp.emp);

    this.ondatatable();
  }
  ondatatable() {
    this.GlobalService.metodoGet(this.zzglob.creaurl('Empresa',this.zzglob.metodo.Select)+this.gvariables.g_empid.id.id
     ).subscribe((res: any) => {
      this.datatable = res.result;
      this.dataSource.data = this.datatable;
      console.log(res.Data);
    });
  }
  onSetData(select: any) {
    this.empresa.emp_cod = select.emp_cod;
    this.empresa.emp_nom = select.emp_nom;
    this.empresa.emp_est = select.emp_est;
    this.empresa.emp_ruc = select.emp_ruc;
    this.empresa.emp_dir = select.emp_dir;
    this.empresa.emp_tlf1 = select.emp_tlf1;
    this.empresa.emp_tlf2 = select.emp_tlf2;
    this.empresa.emp_fax = select.emp_fax;
    this.empresa.emp_email = select.emp_email;
  }
  dataSource = new MatTableDataSource<empresa>(this.datatable.Data);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onInsert(){
    //console.log(this.empresa.emp_cod);
    this.GlobalService.metodoPost(this.zzglob.creaurl('Empresa', this.zzglob.metodo.Insert)
    +this.gvariables.g_empid.id.id,this.empresa
    ).subscribe((resultado) => {
      //if(resultado){
      this.zzglob.mensaje('success', 'OK, Registro Guardado');
      //this.articulo.ars_cod=resultado.art_cod
      this.Cancelar();
      this.ondatatable();})
  }
  onUpdate(){
    this.GlobalService.metodoPut(this.zzglob.creaurl('Empresa', this.zzglob.metodo.Update)
    +this.gvariables.g_empid.id.id,this.empresa
    ).subscribe((resultado) => {
      this.zzglob.mensaje('success', 'OK, Empresa Actualizado');
      this.ondatatable();
      this.Cancelar();
    });


  }
  InicializarCampos() {
    //alert('inicializar campos ');
    this.empresa.emp_cod = '0';
    this.empresa.emp_est = 'ACT';
  }
  Nuevo() {
  //this.Zzappl.gNuevo()
    // Nuevo()
    //  alert('funcion nuevo');
     this.MostrarConsulta=false
     this.MostrarCrud=true
     this.flgAcc="nuevo"
     this.InicializarCampos()
  }
  Actualizar() {
   // alert('funcion Actualizar');
    this.MostrarConsulta=false
    this.MostrarCrud=true
    this.flgAcc="actualizar"

  }

  lAntesGuardar( val:any){
    this.Zzappl.gGuardar
  }
  Guardar(documen:any ):any {
    if(this.Zzappl.gGuardar(documen)==false){return false}
   if(this.flgAcc=="nuevo"){this.onInsert();}else{this.onUpdate();}}

  Cancelar() {
    //this.ondatatable();
    //alert('funcion Cancelar');
    this.MostrarConsulta=true
     this.MostrarCrud=false

  }
}
