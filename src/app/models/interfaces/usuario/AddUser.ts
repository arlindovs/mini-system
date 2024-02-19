import { Integrante } from "../member/IntegranteResponse";
import { GrupoUsuario } from "./GrupoUsuario";

export interface AddUser {
  usuarioGrupo: GrupoUsuario;
  funcionario: Integrante;
  login: string;
  password: string;
  empresa: number;
}
