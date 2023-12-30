import { GrupoIntegrante } from "../group/member/GrupoIntegranteResponse";

export interface addIntegrante{
    grupoIntegrante: string
    tipoIntegrante: string
    nome:string
    segundoNome:string
    telefone:string
    email:string
    tipoDocumento: string
    documento: string
    empresa: number
}