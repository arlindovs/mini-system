export interface EditUser {
  CODIGO: bigint;
  usuarioGrupo: bigint | undefined;
  funcionario: bigint | undefined;
  login: string;
  password: string;
  status: string;
  empresa: number;
}
