export interface LoadEditUser {
  CODIGO: bigint;
  usuarioGrupo: {
    CODIGO: bigint;
    descricao: string;
  };
  funcionario: {
    CODIGO: bigint;
    nome: string;
  };
  login: string;
  password: string;
  status: string;
  empresa: number;
  versao: string;
}
