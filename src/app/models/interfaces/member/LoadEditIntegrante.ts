export interface LoadEditIntegrante{
    CODIGO: bigint;
  integranteGrupo: {
    CODIGO: bigint;
    descricao: string;
  };
  integrante: {
    CODIGO: bigint;
    nome: string;
    segundoNome: string,
    telefone: string,
    email: string,
    tipoDocumento: string,
    documento: string,
    dataCriacao: string,
  };
  status: string;
  empresa: number;
  versao: string;
}