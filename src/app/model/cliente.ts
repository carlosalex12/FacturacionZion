////crear modelo para cada  tabla

export class clientes {
  emp_cod: string = '';
  cli_cod: string = '';
  cli_nom: string = '';
  cli_est:string = 'ACT';
  cli_treg: string = '';
  cli_fkey:string = '';
  cli_fing:Date=new Date()
  cli_tid: string = '';
  cli_nid: string = '';
  cli_dir: string = '';
  cli_tlf1: number =0 ;
  cli_tlf2: number = 0;
  cli_email: string = '';
}
