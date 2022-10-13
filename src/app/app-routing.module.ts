import { NgModule } from '@angular/core';
///importamos la rutas
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './menu/login/login.component';
import { HomeComponent } from './menu/home/home.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { FacturaComponent } from './factura/factura.component';
import { ClienteComponent } from './cliente/cliente.component';
import { PruebaComponent } from './prueba/prueba.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
//import { HomeModule } from './components/home/home.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  //{
  //  path:'homes',loadChildren:()=> import('./components/home/home.module').then(x=>HomeModule)

  //},
  {
    path: 'login',
    component: LoginComponent,
    //canActivate:[AuthGuard]
  },

  {
    path: 'facturacion/:id',
    component: FacturacionComponent,
  },
  {
    path: 'home/:id',
    component: HomeComponent,
  },
  {
    path: 'articulo/:id',
    component: ArticuloComponent,
  },
  {
    path: 'factura/:id',
    component: FacturaComponent,
  },
  {
    path: 'cliente/:id',
    component: ClienteComponent,
  },
  {
    path: 'prueba',
    component: PruebaComponent,
  },
  {
    path: '**',
    component: NoEncontradoComponent,
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
