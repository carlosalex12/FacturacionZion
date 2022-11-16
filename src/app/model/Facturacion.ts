export class Facturacion {
  emp_cod: string = '';
  fac_doc: string = '';
  fac_num: number = 0;
  fac_est: string = '';
  fac_fec:Date=new Date()
  fac_ser: string = '';
  suc_cod: string = '';
  cli_cod: string = '';
  fac_tpag: string = '';
  fac_sub0:number=0
  fac_sub1:number=0
  fac_tot:number=0
  fac_impto:number=0
  fac_obs:string=""
  Detalles: DEtalles[] = [];
}
class DEtalles {
  id: number = 0;
  emp_cod: string = '';
  fac_doc: string = 'FAC';
  fac_num: number = 0;
  fdt_sec:number = 1;
  art_cod: string = '';
  art_nom: string = '';
  fdt_obs:string=''
  fdt_cant: number = 0;
  fdt_prec: number = 0;
  fdt_iva: number = 0;
  fdt_desc: number = 0;
  fdt_sub: number = 0;
}
