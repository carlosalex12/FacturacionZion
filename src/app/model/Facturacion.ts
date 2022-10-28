export class Facturacion {
  emp_cod: string = '';
  fac_doc: string = 'FAC';
  fac_num: number = 0;
  fac_est: string = 'DIG';
  fac_fec: string = '';
  fac_ser: string = '';
  suc_cod: string = '';
  cli_cod: string = '';
  fac_tpag: string = '';
  fac_sub0:number=0
  fac_sub1:number=0

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
  fdt_cant: number = 0;
  fdt_prec: number = 0;
  fdt_iva: number = 12;
  fdt_desc: number = 0;
  fdt_sub: number = 0;
}
