import { GrupoIntegrante } from "../group/member/GrupoIntegranteResponse";

export interface Integrante{
    CODIGO: bigint,
    integranteGrupo: GrupoIntegrante,
    tipoIntegrante: string,
    nome: string,
    segundoNome: string,
    telefone:string,
    email:string,
    tipoDocumento:string,
    documento:string,
    dataCriacao:string,
    status:string,
    empresa:number,
    versao:string
}