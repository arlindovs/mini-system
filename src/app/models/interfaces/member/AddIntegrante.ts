
import { GrupoIntegrante } from "../group/member/GrupoIntegranteResponse";
import { TipoIntegrante } from "./TipoIntegrante";

export interface addIntegrante{
    integranteGrupo: GrupoIntegrante | undefined
    tipoIntegrante: TipoIntegrante | undefined
    nome:string
    segundoNome:string
    telefone:string
    email:string
    tipoDocumento: string
    documento: string
    empresa: number
}