import { Component, OnInit } from '@angular/core';
import { VariablesGlobalesService } from '../serviceMenu/variables-globales.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/GserviceGPPD';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  articulo(){

this.GlobalService
    .metodoGet(`https://localhost:44373/Articulo/ConsultaArticulo?usuario=`+ this.Gvariables.g_empid.id.id)
    .subscribe((resultadoMetodoGet:any) => {
      console.log("resultadoMetodoGet");
    console.log(resultadoMetodoGet)});

    this._router.navigate(
      [`/articulo/`+ this.Gvariables.g_empid.id.id]
    )

  }
  constructor(private Gvariables:VariablesGlobalesService,private GlobalService:GlobalService,
    private _router:Router,
    ) { }

  ngOnInit(): void {
  }

}
