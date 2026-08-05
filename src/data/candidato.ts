import { config } from '@/lib/config'

export const candidato = {
  nome: config.candidateName,
  numero: config.ballotNumber,
  partido: config.party,
  cargo: config.role,
  slogan: config.slogan,
  subtitulo: 'Vereador de Manaus · Delegado · Ex-presidente do Detran-AM',
  intro:
    'Amazonense. Servidor público há mais de 20 anos. Delegado da Polícia Civil, ex-presidente do Detran-AM, atual presidente estadual do PP-AM, vice-presidente da Federação União Progressista e vereador em exercício.',
}

export const historia = {
  titulo: 'Minha História',
  lead: 'Eu sou Rodrigo Sá.',
  paragrafos: [
    'Sou filho de mãe solo, pai da Malu. Formado em Direito pela UFAM e também cursei Engenharia da Computação. Hoje, sou mestre e doutorando em Direito Constitucional.',
    'Atuei no Ministério Público e, em 2011, realizei um dos maiores sonhos da minha vida ao me tornar Delegado de Polícia Civil. Com o passar do tempo, assumi a Diretoria Técnica e, posteriormente, a presidência do Detran-AM.',
    'Os projetos sociais que criei mudaram a vida de milhares de pessoas. Por isso, sou candidato a Deputado Estadual para continuar criando iniciativas que melhorem a vida de quem mais precisa.',
  ],
  marcos: [
    { ano: 'UFAM', texto: 'Formação em Direito' },
    { ano: 'Engenharia', texto: 'Cursou Engenharia da Computação' },
    { ano: '2011', texto: 'Delegado da Polícia Civil' },
    { ano: 'Detran-AM', texto: 'Presidência e projetos estaduais' },
    { ano: 'Hoje', texto: 'Vereador · Presidente PP-AM · Mestre e doutorando' },
  ],
}

export const estatisticas = [
  {
    valor: 140000,
    prefixo: '+de ',
    sufixo: '',
    label: 'pessoas impactadas no Amazonas',
    destaque: true,
  },
  {
    valor: 120000,
    prefixo: '+de ',
    sufixo: '',
    label: 'beneficiados pela CNH Social',
  },
  {
    valor: 14000,
    prefixo: '+de ',
    sufixo: '',
    label: 'atendidos pelo Motociclista Legal',
  },
  {
    valor: 20000,
    prefixo: '+de ',
    sufixo: '',
    label: 'pessoas no Mandato em Movimento',
  },
]
