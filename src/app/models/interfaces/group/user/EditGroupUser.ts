import { Status } from './../../../enums/Status.enum';
export interface EditGroupUser {
  CODIGO: bigint;
  descricao: string;
  perfil: string;
  status: string;
  empresa: number;
}
