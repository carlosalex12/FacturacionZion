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
  scampo:any
  svalor:any
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
    ).subscribe((res:any) => {

       if(res.success==true){
        this.zzglob.mensaje('success', 'OK, Registro Guardado');
        this.Cancelar();
        this.ondatatable();
       }else{

        this.zzglob.mensaje('error',res.message);
       }
     })
  }
  onUpdate(){
    this.GlobalService.metodoPut(this.zzglob.creaurl('Empresa', this.zzglob.metodo.Update)
    +this.gvariables.g_empid.id.id,this.empresa
    ).subscribe((res:any) => {
      if(res.success==true){
        this.zzglob.mensaje('success', 'OK, Empresa Actualizado');
        this.ondatatable();
        this.Cancelar();
      }else{
        this.zzglob.mensaje('error',res.message);
      }

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
     this.clear()
     this.InicializarCampos()
  }
  Actualizar() {
    this.MostrarConsulta=false
    this.MostrarCrud=true
    this.flgAcc="actualizar"

  }

  lAntesGuardar( val:any){
    return true
  }

  Guardar(documen:any ):any {
   if(this.Zzappl.gGuardar(documen)==false){return false}
   if(this.flgAcc=="nuevo"){this.onInsert();}else{this.onUpdate();}}

  Cancelar() {
    //this.ondatatable();
    //alert('funcion Cancelar');
    this.MostrarConsulta=true
     this.MostrarCrud=false
     this.clear()
  }
  foucusOut(idCamp: any) {
    this.scampo = document.getElementById(''+idCamp+'')
    this.svalor = this.scampo.value
    var lparam='&p_Campo=' + idCamp
      +'&p_Valor=' + this.svalor
      +'&p_Usr=' + this.gvariables.g_empid.id.id
      this.GlobalService.metodoGet(' https://localhost:7232/Empresa/ExistenciaEmpresa?'+lparam).subscribe((res: any) => {
        console.log(res.result);
if(res.result.length>0){
  let tmpcod=this.svalor
  this.zzglob.mensaje('error', 'La Empresa  Ya Existe')
  this.scampo = document.getElementById(''+idCamp+'')
  this.scampo.placeholder=tmpcod
  this.empresa.emp_cod=""

}

      });
  }

clear(){
this.empresa.emp_cod=""
this.empresa.emp_dir=""
this.empresa.emp_email=""
this.empresa.emp_est=""
this.empresa.emp_fax=""
this.empresa.emp_nom=""
this.empresa.emp_ruc=""
this.empresa.emp_tlf1=""
this.empresa.emp_tlf2=""

}
}
