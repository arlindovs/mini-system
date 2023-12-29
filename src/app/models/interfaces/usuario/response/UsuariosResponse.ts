import { Perfil } from "src/app/models/enums/group/user/Perfil.enum";

export interface Usuarios {
  CODIGO: bigint;
  usuarioGrupo: bigint;
  funcionario: bigint;
  login: string;
  password: string;
  status: string;
  empresa: number;
  versao: string;
}

