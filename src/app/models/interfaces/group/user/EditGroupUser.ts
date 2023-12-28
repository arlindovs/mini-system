import { Perfil } from 'src/app/models/enums/group/user/Perfil.enum';
export interface EditGroupUser {
  CODIGO: bigint;
  descricao: string;
  perfil: string;
  status: string;
  empresa: number;
}
