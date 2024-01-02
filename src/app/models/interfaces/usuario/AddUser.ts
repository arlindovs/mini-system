export interface AddUser {
  usuarioGrupo: bigint | undefined;
  funcionario: bigint | undefined;
  login: string;
  password: string;
  empresa: number;
}
