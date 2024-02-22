import { GrupoIntegrante } from "../group/member/GrupoIntegranteResponse";

export interface EditIntegrante{
    CODIGO: bigint,
    integranteGrupo:GrupoIntegrante,
    tipoIntegrante: string | undefined,
    nome: string,
    segundoNome: string,
    telefone:string,
    email:string,
    tipoDocumento:string,
    documento:string,
    status:string,
    versao:string
}