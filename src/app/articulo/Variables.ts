import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariableClase {


public gDatosClase = {
emp_cod:"",
ars_cod:"",
ars_nom:"",
ars_est:"",
};

public gDatosUnidad = {
 uni_cod:"",
 uni_nom:"",
 uni_est:"",
  };


  constructor() { }
}
