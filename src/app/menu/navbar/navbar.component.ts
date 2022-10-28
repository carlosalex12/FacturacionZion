import { Component, OnInit } from '@angular/core';
import { VariablesGlobalesService } from '../serviceMenu/variables-globales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/GserviceGPPD';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private G_variables:VariablesGlobalesService,private GlobalService:GlobalService,
    private _router:Router,private readonly _rutaDatos: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.G_variables.g_nemp = {
      emp: this._rutaDatos.snapshot.params,
    };
  }
  articulo(){
    this._router.navigate(
      [`/articulo/`+ this.G_variables.g_empid.id.id+'/'+ this.G_variables.g_nemp.emp.emp]
    )

  }
  factura(){
    this._router.navigate(
      [`/factura/`+ this.G_variables.g_empid.id.id+'/'+this.G_variables.g_nemp.emp.emp]
    )

  }
  cliente(){
    this._router.navigate(
      [`/cliente/`+ this.G_variables.g_empid.id.id+'/'+ this.G_variables.g_nemp.emp.emp]
    )



  }
  prueba(){
    this._router.navigate(
      [`/prueba/`]
    )

  }
  facturacion(){

    this._router.navigate(
      [`/facturacion/`+ this.G_variables.g_empid.id.id+'/'+ this.G_variables.g_nemp.emp.emp]
    )
  }
}
