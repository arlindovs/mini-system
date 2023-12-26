import { Status } from "src/app/models/enums/Status.enum";

export interface GrupoUsuarios {
  CODIGO: bigint;
  descricao: string;
  perfil: string;
  status: string;
  empresa: number;
  versao: Date;
}

