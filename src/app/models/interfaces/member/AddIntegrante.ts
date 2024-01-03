import { GrupoIntegrante } from "../group/member/GrupoIntegranteResponse";

export interface addIntegrante{
    integranteGrupo: bigint 
    tipoIntegrante: string
    nome:string
    segundoNome:string
    telefone:string
    email:string
    tipoDocumento: string
    documento: string
    empresa: number
}