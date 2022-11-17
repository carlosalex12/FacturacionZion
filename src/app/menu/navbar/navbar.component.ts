import { Component, OnInit } from '@angular/core';
import { VariablesGlobalesService } from '../serviceMenu/variables-globales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/GserviceGPPD';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  fbusq = '';
  constructor(
    private G_variables: VariablesGlobalesService,
    private GlobalService: GlobalService,
    private _router: Router,
    private readonly _rutaDatos: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.G_variables.g_empid = {
      id: this._rutaDatos.snapshot.params,
    };
    this.G_variables.g_nemp = {
      emp: this._rutaDatos.snapshot.params,
    };
    console.log(this.G_variables.g_empid.id.id);
  }

  buscar(content: string) {
    console.log(content);
    if (content == '') {
    } else {
      this._router.navigate([
        `/` +
          content +
          `/` +
          this.G_variables.g_empid.id.id +
          '/' +
          this.G_variables.g_nemp.emp.emp,
      ]);
    }
  }
  buscar1(content: string) {
    console.log(content);
    if (content == '') {
    } else {
      this._router.navigate([
        `/` +
          content +
          `/` +
          this.G_variables.g_empid.id.id
      ]);
    }
  }
  login(){
    this._router.navigate([`/login/` ]);
  }
  prueba(){
    this._router.navigate([`/prueba/` ]);
  }
}
