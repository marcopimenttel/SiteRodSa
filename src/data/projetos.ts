export type Projeto = {
  id: string
  titulo: string
  descricao: string
  destaque?: string
  categoria: 'detran' | 'camara'
  icone: string
}

export const projetosDetran: Projeto[] = [
  {
    id: 'cnh-social',
    titulo: 'CNH Social',
    descricao:
      'Garante à população de baixa renda a emissão gratuita da primeira habilitação, adição ou mudança de categoria. Cobre exames médicos, aulas teóricas e práticas, além de taxas administrativas.',
    destaque: '+de 120 mil pessoas beneficiadas no Amazonas',
    categoria: 'detran',
    icone: 'IdCard',
  },
  {
    id: 'motociclista-legal',
    titulo: 'Motociclista Legal',
    descricao:
      'Mototaxistas, motofretistas e motociclistas de aplicativo têm acesso gratuito a cursos de capacitação, IPVA Social e kits com capacetes, coletes e equipamentos de proteção.',
    destaque: '+de 14 mil pessoas beneficiadas no Amazonas',
    categoria: 'detran',
    icone: 'Bike',
  },
  {
    id: 'cnh-na-escola',
    titulo: 'CNH na Escola',
    descricao:
      'Formação teórica gratuita sobre legislação de trânsito para estudantes do Ensino Médio da rede estadual. Com 90 horas de curso, o aluno fica dispensado dessa etapa na autoescola e ainda ganha pontuação prioritária na CNH Social.',
    categoria: 'detran',
    icone: 'GraduationCap',
  },
  {
    id: 'escola-publica-transito',
    titulo: 'Escola Pública de Trânsito',
    descricao:
      'Capacitação gratuita, isenção de taxas e entrega de kits de segurança (capacete, colete refletivo, joelheiras e baú) para mototaxistas e motofretistas.',
    categoria: 'detran',
    icone: 'BookOpen',
  },
  {
    id: 'detran-digital',
    titulo: 'Detran Digital',
    descricao:
      'Serviços online e documentos digitais, com mais agilidade e comodidade para o cidadão amazonense.',
    categoria: 'detran',
    icone: 'MonitorSmartphone',
  },
  {
    id: 'pit-stop',
    titulo: 'PIT STOP Motociclista Legal',
    descricao:
      'Pontos de apoio com descanso, água, banheiro e atendimento do Detran-AM — sem precisar ir até a sede.',
    categoria: 'detran',
    icone: 'MapPin',
  },
  {
    id: 'concurso-pccr',
    titulo: 'Concurso e PCCR',
    descricao:
      'Realização do primeiro concurso público da história do Detran-AM e implantação do primeiro Plano de Cargos, Carreiras e Remuneração (PCCR) da autarquia.',
    categoria: 'detran',
    icone: 'BadgeCheck',
  },
]

export const projetosCamara: Projeto[] = [
  {
    id: 'jardins-de-chuva',
    titulo: 'Jardins de Chuva',
    descricao:
      'Manaus com menos alagamentos. Projeto criado para reduzir os alagamentos na cidade de forma sustentável.',
    categoria: 'camara',
    icone: 'Droplets',
  },
  {
    id: 'reforma-solidaria',
    titulo: 'Reforma Solidária no Natal',
    descricao: '10 famílias tiveram suas casas reformadas e seus lares renovados.',
    destaque: '10 famílias atendidas',
    categoria: 'camara',
    icone: 'Home',
  },
  {
    id: 'mandato-em-movimento',
    titulo: 'Mandato em Movimento',
    descricao:
      'Serviços gratuitos de saúde, cidadania e bem-estar levados até a população.',
    destaque: '+de 20.000 pessoas atendidas',
    categoria: 'camara',
    icone: 'HeartHandshake',
  },
]
