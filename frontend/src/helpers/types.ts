export type Employee = {
  id: string;
  nome: string;
  email: string;
  //senha: string;
  profilePicture?: string;
  cargo: string;
  dataContratacao: Date;
  retiradas: Retirada[];
  notificacoes: Notificacao[];
};

export type EPI = {
  id: string;
  descricao?: string;
  categoria?: string;
  nome: string;
  fotoUrl?: string;
  quantidadeDisponivel: number;
  dataValidade?: Date;
  retiradas: Retirada[];
};

export type Retirada = {
  id: string;
  dataRetirada: Date;
  dataPrevistaDevolucao?: Date;
  funcionarioId: string;
  funcionario: Employee;
  epiId: string;
  epi: EPI;
  devolucao?: Devolucao;
  adminAprovacaoId: string;
  adminAprovacao: Admin;
};

export type Devolucao = {
  id: string;
  dataDevolucao: Date;
  retiradaId: string;
  retirada: Retirada;
  adminAprovacaoId: string;
  adminAprovacao: Admin;
};

export type Notificacao = {
  id: string;
  tipo: string;
  mensagem: string;
  dataEnvio: Date;
  funcionarioId: string;
  funcionario: Employee;
  adminId: string;
  admin: Admin;
  createdAt: Date;
  updatedAt: Date;
};

export type Admin = {
  id: string;
  nome: string;
  email: string;
  //senha: string;
  createdAt: Date;
  updatedAt: Date;
  aprovacoesRetirada: Retirada[];
  aprovacoesDevolucao: Devolucao[];
};
