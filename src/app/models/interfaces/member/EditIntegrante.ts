import { GrupoIntegrante } from "../group/member/GrupoIntegranteResponse";

export interface EditIntegrante{
    CODIGO: bigint,
    integranteGrupo:bigint,
    tipoIntegrante: string,
    nome: string,
    segundoNome: string,
    telefone:string,
    email:string,
    tipoDocumento:string,
    documento:string,
    dataCriacao:string,
    status:string,
    versao:string
}