import { Status } from "src/app/models/enums/Status.enum";

export interface GrupoUsuarios {
  CODIGO: bigint | null;
  descricao: string;
  perfil: string;
  status: string;
  empresa: number;
  versao: Date;
}

