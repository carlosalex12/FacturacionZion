import { ArticuloInterface } from "./ArticuloInterface";
import { ClienteInterface } from "./ClienteInterface";
import { FacdetInterface } from "./FacdetInterface";
import { FacturaInterface } from "./facturaInterface";

export interface FacturacionInterface{
Factura:FacturaInterface[];
cliente:ClienteInterface[];
articulo:ArticuloInterface[];
Detalle:FacdetInterface[];
}
